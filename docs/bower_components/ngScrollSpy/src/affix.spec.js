describe('Testing affix directive', function () {
  var element, scope, scrollSpyMock, scrollSpyMockSpier;

  beforeEach(function() {
    scrollSpyMockSpier= undefined;
  });

  beforeEach(function() {
  	angular.module('ngScrollSpyMocks', [])
  		.service('ScrollSpy', function() {
  			scrollSpyMock= this;
        this.onYScroll= function(handler) {
          scrollSpyMock.handler= handler;
          return 'IDOFYHANDLER';
        };

        this.onXScroll= function(handler) {
          scrollSpyMock.handler= handler;
          return 'IDOFXHANDLER';
        };

        this.trigger= function() {
        };

        this.removeHandler= function(id) {
        };

        if(scrollSpyMockSpier) scrollSpyMockSpier();
  		});

  	angular.module('Test', ['ngScrollSpy', 'ngScrollSpyMocks'])
  });

  beforeEach(module('Test'));

  var template= '<div affix="bottom" affix-class="affixit"></div>';
  var templateWithDefaults= '<div affix></div>';
  var templateTop= '<div affix="top"></div>';
  var templateBottom= '<div affix="bottom"></div>';
  var templateLeft= '<div affix="left"></div>';
  var templateRight= '<div affix="right"></div>';

  var currentRect;
  var returnRectHandler= function() {
    return currentRect();
  };
  var returnRect= function(t,h,l,w) {
    currentRect= function() {
      return {left: l, right: l+w, top: t, height: h, bottom: t+h, width: w};
    };
  };


  function compile(template) {
    inject(function($compile, $rootScope) {
      var linkingFn = $compile(template);
      element= linkingFn($rootScope.$new());
      scope= element.isolateScope();
    });
  };

  it('should contain top in affix value and affix in affixClass value', function() {
    compile(templateWithDefaults);
    expect(scope.affix).toBe('top');
    expect(scope.affixClass).toBe('affix');
  });

  it('should contain bottom in affix value and affixit in affixClass value', function() {
    compile(template);
    expect(scope.affix).toBe('bottom');
    expect(scope.affixClass).toBe('affixit');
  });

  it('should contain top in affix value', function() {
    scrollSpyMockSpier= function() {
      spyOn(scrollSpyMock, 'trigger');
      spyOn(scrollSpyMock, 'onYScroll').andCallThrough();
    }
    compile(templateTop);
    expect(scope.affix).toBe('top');
    expect(scrollSpyMock.onYScroll).toHaveBeenCalled();
    expect(scrollSpyMock.trigger).not.toHaveBeenCalled();

    spyOn(element[0], 'getBoundingClientRect').andCallFake(returnRectHandler);
    spyOn(element, 'addClass');
    spyOn(element, 'removeClass');

    returnRect(100,10,0,10);
    scrollSpyMock.handler(0);
    expect(element[0].getBoundingClientRect).toHaveBeenCalled();
    expect(element.addClass).not.toHaveBeenCalled();
    expect(element.removeClass).not.toHaveBeenCalled();

    returnRect(0,10,0,10);
    scrollSpyMock.handler(100);
    // Sadly can't test this since I need access
    // to the reference to the element created
    // in the linking function, not the reference
    // that the linking function returns. Any help
    // would be appreciated
    //expect(element.addClass).toHaveBeenCalled();
  });

  it('should contain bottom in affix value', function() {
    scrollSpyMockSpier= function() {
      spyOn(scrollSpyMock, 'trigger');
      spyOn(scrollSpyMock, 'onYScroll').andCallThrough();
    }
    compile(templateBottom);
    expect(scope.affix).toBe('bottom');
    expect(scrollSpyMock.onYScroll).toHaveBeenCalled();
    expect(scrollSpyMock.trigger).toHaveBeenCalled();
  });

  it('should contain left in affix value', function() {
    scrollSpyMockSpier= function() {
      spyOn(scrollSpyMock, 'trigger');
      spyOn(scrollSpyMock, 'onXScroll').andCallThrough();
    }
    compile(templateLeft);
    expect(scope.affix).toBe('left');
    expect(scrollSpyMock.onXScroll).toHaveBeenCalled();
    expect(scrollSpyMock.trigger).not.toHaveBeenCalled();
  });

  it('should contain right in affix value', function() {
    scrollSpyMockSpier= function() {
      spyOn(scrollSpyMock, 'trigger');
      spyOn(scrollSpyMock, 'onXScroll').andCallThrough();
    }
    compile(templateRight);
    expect(scope.affix).toBe('right');
    expect(scrollSpyMock.onXScroll).toHaveBeenCalled();
    expect(scrollSpyMock.trigger).toHaveBeenCalled();
  });

  it('should cleanup on $destroy', function() {
    scrollSpyMockSpier= function() {
      spyOn(scrollSpyMock, 'removeHandler').andCallThrough();
    }
    compile(template);
    scope.$broadcast('destroy');
    expect(scrollSpyMock.removeHandler).toHaveBeenCalledWith('IDOFYHANDLER');
  });

});