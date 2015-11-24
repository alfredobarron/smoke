describe('Testing pageitems directive', function () {
  var element, scope;
  beforeEach(module('ngScrollSpy'));

  var stateMock;
  function compile($compile, $rootScope) {
    getState= function() {
      return stateMock;
    };
    var linkingFn = $compile(
      '<div pageitems selector="pageitem" topmargin="20">' +
        '<div id="1" class="pageitem"></div>' +
        '<div id="2" class="pageitem"></div>' +
        '<div id="3" class="pageitem"></div>' +
      '</div>'
    );
    scope = $rootScope.$new();
    element = linkingFn(scope);
    scope= element.isolateScope();
  };

  function clone(s,d) {
    for (var k in s) {
      d[k] = s[k];
    }
  }

  it('called state.store', inject(function ($compile, $rootScope) {
    stateMock= {
      store: jasmine.createSpy('store')
    };
    compile($compile, $rootScope);
    expect(stateMock.store).toHaveBeenCalled();
  }));

  it('adds selector and topmargin to scope', inject(function ($compile, $rootScope) {
    stateMock= {
      store: function() {}
    };
    compile($compile, $rootScope);
    expect(scope.selector).toBe('pageitem');
    expect(scope.topmargin).toBe('20');
  }));

  it('adds dom elements with class pageitem to spyElems array on scope', inject(function ($compile, $rootScope) {
    stateMock= {
      store: function() {}
    };
    compile($compile, $rootScope);
    expect(scope.spyElems.length).toBe(3);
    expect(scope.spyElems[0].id).toBe('1');
    expect(scope.spyElems[1].id).toBe('2');
    expect(scope.spyElems[2].id).toBe('3');
  }));

  it('added four methods to state.store', inject(function ($compile, $rootScope) {
    stateMock= {
      store: function(o) {
        clone(o,this);
      }
    };
    compile($compile, $rootScope);
    expect(stateMock.store.topMargin).not.toBe(null);
    expect(stateMock.store.addSpy).not.toBe(null);
    expect(stateMock.store.getSpy).not.toBe(null);
    expect(stateMock.store.items).not.toBe(null);
  }));

  it('test the four mehtods added to state', inject(function ($compile, $rootScope) {
    stateMock= {
      store: function(o) {
        clone(o,this);
      }
    };
    compile($compile, $rootScope);
    var spy= {id: 'SPY'};
    stateMock.addSpy(spy);
    expect(stateMock.getSpy('SPY')).toEqual(spy);
    expect(stateMock.topMargin()).toBe(20);
    expect(stateMock.items()).toEqual(scope.spyElems);
  }));

});