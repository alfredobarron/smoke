describe('Testing pagemenu directive', function () {
  var element, scope;
  beforeEach(module('ngScrollSpy'));

  var stateMock;
  function compile($compile, $rootScope) {
    getState= function() {
      return stateMock;
    };
    var linkingFn = $compile(
      '<pagemenu></pagemenu>'
    );
    element = linkingFn($rootScope.$new());
    scope= element.isolateScope();
  };

  function getSpyElements() {
    var items= [];
    items.push({ id: 'Item1', innerText: 'Text1', tagName: 'TAG', classList: []});
    items.push({ id: 'Item2', innerText: 'Text2', tagName: 'TAG', classList: []});
    items.push({ id: 'Item3', innerText: 'Text3', tagName: 'TAG', classList: ['class1']});
    items.push({ id: 'Item4', innerText: 'Text4', tagName: 'TAG', classList: ['class1']});
    items.push({ id: 'Item5', innerText: 'Text5', tagName: 'TAG', classList: ['class2']});
    items.push({ id: 'Item6', innerText: 'Text6', tagName: 'TAG', classList: []});
    items.push({ id: 'Item7', innerText: 'Text7', tagName: 'TAG2', classList: []});
    return items;
  }

  it('called state.setBuilder', inject(function ($compile, $rootScope) {
    stateMock= {
      setBuilder: jasmine.createSpy('setBuilder')
    };
    compile($compile, $rootScope);
    expect(stateMock.setBuilder).toHaveBeenCalled();
  }));

  function constructMock(spies) {
    return {
      items: function() {
        return getSpyElements();
      },
      addSpy: function(spy) {
        spies[spy.id]= spy;
      },
      setBuilder: function(builder) {
        builder();
      }
    };
  }

  it('builds tree structure from item list', inject(function ($compile, $rootScope) {
    var spies= {};
    stateMock= constructMock(spies);
    compile($compile, $rootScope);
    expect(spies['Item1'].parent).toBe('');
    expect(spies['Item2'].parent).toBe('');
    expect(spies['Item3'].parent).toBe('Item2');
    expect(spies['Item4'].parent).toBe('Item2');
    expect(spies['Item5'].parent).toBe('Item4');
    expect(spies['Item6'].parent).toBe('');
    expect(spies['Item7'].parent).toBe('Item6');
  }));

  it('builds tree structure from item list', inject(function ($compile, $rootScope) {
    var spies= {};
    stateMock= constructMock(spies);
    compile($compile, $rootScope);
  }));
});