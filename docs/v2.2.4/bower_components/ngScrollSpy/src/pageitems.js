mod.directive('pageitems', function(ScrollSpy) {
	var linkfn = function(scope, elem, attrs) {
		if (!angular.isDefined(scope.selector)) {
			console.log('Pageitems: no selector defined');
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