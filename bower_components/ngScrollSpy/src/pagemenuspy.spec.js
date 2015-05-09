describe('Testing pagemenuspy directive', function () {
  var element, scope;
  beforeEach(module('ngScrollSpy'));

  var stateMock;
  function compile($compile, $rootScope) {
    getState= function() {
      return stateMock;
    };
    var linkingFn = $compile('<span pagemenuspy="ItemID" parent="ParentID"></span>');
    scope = $rootScope;
    element = linkingFn(scope);
  };

  it('called state.addSpy', inject(function ($compile, $rootScope) {
    stateMock= {
      addSpy: jasmine.createSpy('addSpy')
    };
    compile($compile, $rootScope);
    expect(stateMock.addSpy).toHaveBeenCalled();
  }));


  function clone(s,d) {
    for (var k in s) {
      d[k] = s[k];
    }
  }

  it('added a spy to state object', inject(function ($compile, $rootScope) {
    stateMock= {
      addSpy: function(o) {
        clone(o,this);
      }
    };
    compile($compile, $rootScope);
    expect(stateMock.id).toBe('ItemID');
    expect(stateMock.parent).toBe('ParentID');
    expect(stateMock.set).not.toBe(null);
    expect(stateMock.clear).not.toBe(null);
  }));

  it('called getSpy after set being called', inject(function ($compile, $rootScope) {
    stateMock= {
      addSpy: function(o) {
        clone(o,this);
      },
      getSpy: jasmine.createSpy('getSpy')
    };
    compile($compile, $rootScope);
    stateMock.set();
    expect(stateMock.getSpy).toHaveBeenCalled();
  }));

  it('sets class to be active, retrieves parents and sets parent to be active', inject(function ($compile, $rootScope) {
    stateMock= {
      addSpy: function(o) {
        clone(o,this);
      },
      getSpy: function(parentId) {
        this.parentId= parentId;
        var self= this;
        return {
          set: function() {
            self.parentIsActive= true;
          }
        };
      }
    };
    compile($compile, $rootScope);
    expect(element.hasClass('active')).toBe(false);
    stateMock.set();
    expect(element.hasClass('active')).toBe(true);
    expect(stateMock.parentId).toBe('ParentID');
    expect(stateMock.parentIsActive).toBe(true);
  }));

  it('cleared active on calling clear', inject(function ($compile, $rootScope) {
    stateMock= {
      addSpy: function(o) {
        clone(o,this);
      }
    };
    compile($compile, $rootScope);
    element.addClass('active');
    stateMock.clear();
    expect(element.hasClass('active')).toBe(false);
  }));
});