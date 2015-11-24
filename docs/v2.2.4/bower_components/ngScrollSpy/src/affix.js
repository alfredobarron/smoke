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