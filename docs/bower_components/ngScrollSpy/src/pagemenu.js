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