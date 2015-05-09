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