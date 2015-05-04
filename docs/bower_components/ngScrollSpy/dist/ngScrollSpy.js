/*
Copyright (c) 2014 Magnús Örn Gylfason
Licence: MIT
*/
;(function(angular) {
	'use strict';

	var mod= angular.module('ngScrollSpy', []);

mod.service('ScrollSpy', function($window) {
	var rawData= function(w) {
		// retrieve interesting data
		var raw= {
			width: w.innerWidth,
			height: w.innerHeight,
			maxWidth: w.document.body.scrollWidth,
			maxHeight: w.document.body.scrollHeight,
			posX: w.scrollX,
			posY: w.scrollY
		};

		// remove but log overscroll
		if(raw.posX < 0) {
			raw.posX= 0;
			raw.overscrollLeft= true;
		} else if(raw.posX + raw.width > raw.maxWidth) {
			raw.posX= raw.maxWidth - raw.width;
			raw.overscrollRight= true;
		}

		if(raw.posY < 0) {
			raw.posY= 0;
			raw.overscrollTop= true;
		} else if(raw.posY + raw.height > raw.maxHeight) {
			raw.posY= raw.maxHeight - raw.height;
			raw.overscrollBottom= true;
		}
		raw.hasOverscroll= raw.overscrollTop || raw.overscrollBottom || raw.overscrollLeft || raw.overscrollRight;

		return raw;
	};

	// calculate difference between last state and current state
	var getDelta= function(state1, state2) {

		// if state1 is undefined, return state2 + isEqual=false and velocity=0 as delta
		if(!state1 || !state2)
			return angular.extend(
				{isEqual: false, velocityX: 0, velocityY: 0},
				state2
			);

		// calculate delta of state1 and state2
		var delta= {
			posX: state2.posX - state1.posX,
			posY: state2.posY - state1.posY,
			width: state2.width - state1.width,
			height: state2.height - state1.height,
			maxWidth: state2.maxWidth - state1.maxWidth,
			maxHeight: state2.maxHeight - state1.maxHeight,
		};

		// add velocity information
		if(state2.width > 0)
			delta.velocityX= delta.posX / state2.width;
		if(state2.height > 0)
			delta.velocityY= delta.posY / state2.height;

		// if any property is not 0, the delta is not zero
		delta.isEqual= !(
			delta.posX !== 0 ||
			delta.posY !== 0 ||
			delta.width !== 0 ||
			delta.height !== 0 ||
			delta.maxWidth !== 0 ||
			delta.maxHeight !== 0
		);

		return delta;
	};

	var handlers= {};
	var lastPos;
	var scrollHandler= function(force) {
		var curPos= rawData($window);
		var delta= getDelta(lastPos, curPos);
		if(!delta.isEqual || curPos.hasOverscroll || force) {
			for(var k in handlers) {
				var cond= handlers[k].cond;
				if(cond(curPos, delta) || force) {
					handlers[k].handler(curPos, delta);
				}
			}
			lastPos= curPos;
		}
	};
	angular.element($window).on('scroll', scrollHandler);

	var self= this;

	// id generator
	var idgen= 0;

	this.trigger= function() {
		this.isForced= true;
		scrollHandler(true);
		this.isForced= false;
	};

	// generic handler, cond() should return true/false based on delta
	this.addHandler= function(cond, handler) {
		handlers[idgen]= {cond: cond, handler: handler};
		idgen++;
		return idgen-1;
	};

	// call this to clean up
	this.removeHandler= function(id) {
		delete handlers[id];
	};

	// add handler for all scroll
	this.onScroll= function(handler) {
		return self.addHandler(
			function() { return true; },
			function(raw, delta) { handler(raw, delta); }
		);
	};

	// add handler for horizontal scroll
	this.onXScroll= function(handler) {
		return self.addHandler(
			function(cur, delta) { return delta.posX !== 0; },
			function(raw, delta) { handler(raw.posX, delta.posX, raw, delta); }
		);
	};

	// add handler for vertical scroll
	this.onYScroll= function(handler) {
		return self.addHandler(
			function(cur, delta) { return delta.posY !== 0; },
			function(raw, delta) { handler(raw.posY, delta.posY, raw, delta); }
		);
	};

	// add handlers for various overscroll events
	this.onOverscrollHorz= function(handler) {
		return self.addHandler(
			function(cur, delta) { return cur.overscrollLeft || cur.overscrollRight; },
			handler
		);
	};

	this.onOverscrollLeft= function(handler) {
		return self.addHandler(
			function(cur, delta) { return cur.overscrollLeft; },
			handler
		);
	};

	this.onOverscrollRight= function(handler) {
		return self.addHandler(
			function(cur, delta) { return cur.overscrollRight; },
			handler
		);
	};

	this.onOverscrollVert= function(handler) {
		return self.addHandler(
			function(cur, delta) { return cur.overscrollTop || cur.overscrollBottom; },
			handler
		);
	};

	this.onOverscrollTop= function(handler) {
		return self.addHandler(
			function(cur, delta) { return cur.overscrollTop; },
			handler
		);
	};

	this.onOverscrollBottom= function(handler) {
		return self.addHandler(
			function(cur, delta) { return cur.overscrollBottom; },
			handler
		);
	};

});
mod.directive('affix', function(ScrollSpy) {
  var affixFn= function(shouldAffixFn, wasAffixed, affixClass, elem) {
    var shouldAffix= shouldAffixFn(elem[0].getBoundingClientRect());
    if(shouldAffix !== wasAffixed) {
      if(shouldAffix) {
        elem.addClass(affixClass);
      } else {
        elem.removeClass(affixClass);
      }
    }
  };

  var scrollHandler;
  var linkFn= function(affixTo, affixClass, elem) {
    var isAffixed= false,
      wasAffixed= false,
      affixedPos,
      trigger= false;

    if(affixTo === 'top') {
      scrollHandler= ScrollSpy.onYScroll(function(pos) {
        wasAffixed= isAffixed;
        affixFn(function(rect) {
          if(isAffixed) {
            isAffixed= (affixedPos <= pos);
            return isAffixed;
          } else if(rect.top <= 0) {
            if(rect.top < 0) affixedPos= pos + rect.top;
            else affixedPos= pos;
            return (isAffixed= true);
          }
          return false;
        }, wasAffixed, affixClass, elem);
      });
    } else if(affixTo === 'bottom') {
      trigger= true; // need to trigger scroll event
      scrollHandler= ScrollSpy.onYScroll(function(pos, delta, data) {
        wasAffixed= isAffixed;
        affixFn(function(rect) {
          if(isAffixed) {
            // we are still affixed if we have not scrolled passed
            isAffixed= (affixedPos >= pos);
            return isAffixed;
          } else if(rect.bottom >= data.height) {
            // lets affix
            // first event when at top is a special case,
            // calculate affixed pos differently
            if(ScrollSpy.isForced && pos === 0)
              affixedPos= pos + rect.bottom - data.height - rect.height;
            else
              affixedPos= pos + rect.bottom - data.height;
            return (isAffixed= true);
          }
          // not affixed
          return false;
        }, wasAffixed, affixClass, elem);
      });
    } else if(affixTo === 'left') {
      scrollHandler= ScrollSpy.onXScroll(function(pos) {
        wasAffixed= isAffixed;
        affixFn(function(rect) {
          if(isAffixed) {
            isAffixed= (affixedPos <= pos);
            return isAffixed;
          } else if(rect.left <= 0) {
            if(rect.left < 0) affixedPos= pos + rect.left;
            else affixedPos= pos;
            return (isAffixed= true);
          }
          return false;
        }, wasAffixed, affixClass, elem);
      });
    } else if(affixTo === 'right') {
      trigger= true; // need to trigger scroll event
      scrollHandler= ScrollSpy.onXScroll(function(pos, delta, data) {
        wasAffixed= isAffixed;
        affixFn(function(rect) {
          if(isAffixed) {
            // we are still affixed if we have not scrolled passed
            isAffixed= (affixedPos >= pos);
            return isAffixed;
          } else if(rect.right >= data.width) {
            // lets affix
            // first event when at left is a special case,
            // calculate affixed pos differently
            if(ScrollSpy.isForced && pos === 0)
              affixedPos= pos + rect.right - data.width - rect.width;
            else
              affixedPos= pos + rect.right - data.width;
            return (isAffixed= true);
          }
          // not affixed
          return false;
        }, wasAffixed, affixClass, elem);
      });
    }
    if(trigger) {
      ScrollSpy.trigger();
    }
  };

  return {
    restrict: 'A',
    scope: {
    	affix: '@',
      affixClass: '@'
    },
    link: function(scope, elem, attrs, controller) {
      // call linking function, supply default values if needed
      scope.affix= scope.affix || 'top';
      scope.affixClass= scope.affixClass || 'affix';
      linkFn(scope.affix, scope.affixClass, elem);
      scope.$on('destroy', function() {
        ScrollSpy.removeHandler(scrollHandler);
      });
    }
  };
});
var state = {
	onRun: null,
	state: null,
	store: function(s) {
		for (var k in s) {
			this[k] = s[k];
		}
		this.state = true;
		this.run();
	},
	builder: null,
	setBuilder: function(builder) {
		this.builder = builder;
		this.run();
	},
	run: function() {
		if (this.builder && this.state) {
			this.builder();
			this.builder= null;
			this.state= null;
			if(this.onRun) {
				this.onRun();
				this.onRun= null;
			}
		}
	}
};
mod.directive('pageitems', function(ScrollSpy) {
	var linkfn = function(scope, elem, attrs) {
		if (!angular.isDefined(scope.selector)) {
			void 0;
			return;
		}
		scope.spyElems = elem[0].getElementsByClassName(scope.selector); // dom items
		scope.spies = {}; // menu items

		// this function will be called once dom is parsed and menu is created
		getState().onRun= function() {
			scope.spies[scope.spyElems[0].id].set(); // highlight first element
		};

		// Store my state that pagemenu will use to build the menu
		getState().store({
			topMargin: function() {
				return scope.topmargin |  0; // so that pagemenu can correctly offset scrolling
			},
			addSpy: function(spyObj) {
				scope.spies[spyObj.id] = spyObj; // each item in menu calls this function to register itself with pageitems
			},
			getSpy: function(id) {
				return scope.spies[id]; // return the spy associated with id
			},
			items: function() {
				return scope.spyElems; // return a list of dom items to be used to build menu
			}
		});

		var spyElems = scope.spyElems;
		var topmargin = scope.topmargin | 0;
		var scrollHandler= ScrollSpy.onYScroll(function(y, delta, data) {
			var highlightSpy = null;
			var spies = scope.spies;

			// cycle through `spy` elements to find which to highlight
			for (var i = 0; i < spyElems.length; i++) {
				var spyElem = spyElems[i];
				var spy = spies[spyElem.id];
				spy.clear();

				if (spyElem.getBoundingClientRect().top === undefined) {
					continue;
				}

				var pos = spyElem.getBoundingClientRect().top;
				if (pos <= topmargin) {
					// the window has been scrolled past the top of a spy element
					spy.pos = pos;

					if (highlightSpy === null) {
						highlightSpy = spy;
					}
					if (highlightSpy.pos < spy.pos) {
						highlightSpy = spy;
					}
				} else if (highlightSpy === null) {
					highlightSpy = spy;
				}
			}

			// if we are at the bottom of the page, higlight last spy
			if((data.height + y) >= data.maxHeight) {
				highlightSpy = spies[spyElems[spyElems.length-1].id];
			}

			highlightSpy.set();
			scope.$on('destroy', function() {
				ScrollSpy.removeHandler(scrollHandler);
      });

		});
	};

	return {
		restrict: 'A',
		scope: {
			selector: '@',
			topmargin: '@'
		},
		link: linkfn
	};
});
mod.directive('pagemenu', function($compile, $location, $anchorScroll) {
	var postlinkfn = function(scope, element) {
		var stack = []; // stack to build tree
		var parentstack= []; // current ancestry
		var lastitem; // used to build the tree

		var itemConstruct = function(data) {
			// parse basic info from the dom item
			var item = {
				link: data.id,
				text: data.textContent || data.innerText,
				parent: ''
			};

			// build type identifier
			var level = data.tagName;
			for (var i = 0; i < data.classList.length; i++) {
				level += ',' + data.classList[i];
			}

			// here be dragons
			var stacksize = stack.length;
			if (stacksize === 0) {
				// we are at the top level and will stay there
				stack.push(level);
			} else if (level !== stack[stacksize - 1]) {
				// traverse the ancestry, looking for a match
				for (var j = stacksize - 1; j >= 0; j--) {
					if (level == stack[j]) {
						break; // found an ancestor
					}
				}
				if (j < 0) {
					// this is a new submenu item, lets push the stack
					stack.push(level);
					item.push = true;
					parentstack.push(lastitem);
				} else {
					// we are either a sibling or higher up the tree,
					// lets pop the stack if needed
					item.pop = stacksize - 1 - j;
					while (stack.length > j + 1) {
						stack.pop();
						parentstack.pop();
					}
				}
			}

			// if we have a parent, lets record it
			if(parentstack.length > 0) {
				item.parent= parentstack[parentstack.length-1];
			}

			// for next iteration
			lastitem= item.link;
			return item;
		};

		// dom items to build menu from
		var items = getState().items();
		var markup = '';
		for (var i = 0; i < items.length; i++) {
			var item = itemConstruct(items[i]);
			if (item.push) {
				// new submenu
				markup += '<menu class="nav">';
			} else if (item.pop) {
				// closing submenu, maybe more than one
				for (var j = 0; j < item.pop; j++) {
					markup += '</li></menu>';
				}
			} else if (i !== 0) {
				// sibling
				markup += '</li>';
			}

			// basic markup
			markup += '<li pagemenuspy="' + item.link + '" parent="' + item.parent + '">';
			markup += '<a href="#' + item.link + '">';
			markup += item.text;
			markup += '</a>';
		}
		markup += '</li>';
		element.append($compile(markup)(scope));

		element.on('click', function(e) {
			// menu item clicked, lets scroll to the associated dom item
			var hash = e.target.hash.substring(1);
			$location.hash(hash);
			$anchorScroll();
			if(getState().topMargin() !== 0 ) {
				setTimeout(function() {
					// scroll the extra top margin
					window.scrollTo(
						window.pageXOffset,
						window.pageYOffset - getState().topMargin()
					);
				}, 0);
			}
		});
	};

	return {
		restrict: 'E',
		replace: true,
		template: '<menu class="nav pagemenu"></menu>',
		link: function(scope, element) {
			// We can't create menu if pageitems element hasn't traversed the dom.
			// For now we simply hook hour linking function. If pageitems has already
			// traversed the dom it will called right away, otherwise it will be called
			// once the dom has been traversed. This means we can include the menu in
			// the dom either before the items are queried, or after. There is no
			// positional dependency between the pageitems directive and the
			// pagemenu directive.
			getState().setBuilder(function() {
				postlinkfn(scope, element);
			});
		}
	};
});
mod.directive('pagemenuspy', function($location, $anchorScroll) {
	return {
		restrict: "A",
		link: function(scope, elem, attrs) {
			getState().addSpy({
				id: attrs.pagemenuspy, // my id
				parent: attrs.parent, // my parent spy
				set: function() {
					// higlight me and and parent if I have a parent
					elem.addClass('active');
					var parent= getState().getSpy(this.parent);
					if(parent) parent.set();
				},
				clear: function() {
					// clear my highight
					elem.removeClass('active');
				}
			});
		}
	};
});

	function getState() { return state; }
})(angular);