describe('Testing ScrollSpy service', function () {
  var service,
    windowMock,
    windowMockSpier,
    scrollResult,
    scrollTesters;

  beforeEach(function() {
    windowMockSpier= undefined;
  });

  beforeEach(function() {
  	angular.module('ngScrollSpyMocks', [])
  		.service('$window', function() {
  			windowMock= this;
        this.on= function(e,h) {
          this.handler= h;
        };
        this.set= function(dim) {
          this.innerWidth= dim.w || 100;
          this.innerHeight= dim.h || 100;
          this.document= {
            body: {
              scrollWidth: dim.sw || 1000,
              scrollHeight: dim.sh || 1000
            }
          };
          this.scrollX= dim.x || 0;
          this.scrollY= dim.y || 0;
        };

        this.trigger= function(force) {
          this.handler(force);
        }

        if(windowMockSpier) windowMockSpier();
  		});

  	angular.module('Test', ['ngScrollSpy', 'ngScrollSpyMocks'])
  });

  beforeEach(function() {
    var old= angular.element;
    angular.element= function(el) {
      if(el === windowMock) return windowMock;
      return old(el);
    }
  });

  beforeEach(module('Test'));

  beforeEach(function() {
    scrollTesters= {
      onHandler: function(cur, delta) {
        scrollResult={ cur: cur, delta: delta};
      },
      testHandler: function(ScrollSpy, cond) {
        spyOn(this, 'onHandler').andCallThrough();
        return ScrollSpy.addHandler(cond, this.onHandler);
      },
      onScroll: function(cur, delta) {
        scrollResult={ cur: cur, delta: delta};
      },
      testScroll: function(ScrollSpy) {
        spyOn(this, 'onScroll').andCallThrough();
        return ScrollSpy.onScroll(this.onScroll);
      },
      onXScroll: function(pos, delta, raw, draw) {
        scrollResult={ pos: pos, delta: delta, raw: raw, draw: draw};
      },
      testXScroll: function(ScrollSpy) {
        spyOn(this, 'onXScroll').andCallThrough();
        return ScrollSpy.onXScroll(this.onXScroll);
      },
      onYScroll: function(pos, delta, raw, draw) {
        scrollResult={ pos: pos, delta: delta, raw: raw, draw: draw};
      },
      testYScroll: function(ScrollSpy) {
        spyOn(this, 'onYScroll').andCallThrough();
        return ScrollSpy.onYScroll(this.onYScroll);
      },
      onOverscrollHorz: function(raw, draw) {
        scrollResult={ raw: raw, draw: draw};
      },
      testOverscrollHorz: function(ScrollSpy) {
        spyOn(this, 'onOverscrollHorz').andCallThrough();
        return ScrollSpy.onOverscrollHorz(this.onOverscrollHorz);
      },
      onOverscrollVert: function(raw, draw) {
        scrollResult={ raw: raw, draw: draw};
      },
      testOverscrollVert: function(ScrollSpy) {
        spyOn(this, 'onOverscrollVert').andCallThrough();
        return ScrollSpy.onOverscrollVert(this.onOverscrollVert);
      }
    };
  });

  it('should call generic handler when Y hits 100', inject(function(ScrollSpy) {
    scrollTesters.testHandler(ScrollSpy, function(rawdata) {
      return rawdata.posY === 100;
    });
    windowMock.set({y: 99});
    windowMock.trigger();
    expect(scrollTesters.onHandler).not.toHaveBeenCalled();
    windowMock.set({y: 101});
    windowMock.trigger();
    expect(scrollTesters.onHandler).not.toHaveBeenCalled();
    windowMock.set({y: 100});
    windowMock.trigger();
    expect(scrollTesters.onHandler).toHaveBeenCalled();
  }));

  it('should call scroll handler', inject(function(ScrollSpy) {
    scrollTesters.testScroll(ScrollSpy);
    windowMock.set({x: 1});
    windowMock.trigger();
    expect(scrollTesters.onScroll).toHaveBeenCalled();
  }));

  it('should not call scroll handler', inject(function(ScrollSpy) {
    var h= scrollTesters.testScroll(ScrollSpy);
    ScrollSpy.removeHandler(h);
    windowMock.set({x: 1});
    windowMock.trigger();
    expect(scrollTesters.onScroll).not.toHaveBeenCalled();
  }));

  it('should call onXScroll with pos == 10', inject(function(ScrollSpy) {
    scrollTesters.testXScroll(ScrollSpy);
    windowMock.set({x: 10});
    windowMock.trigger();
    expect(scrollTesters.onXScroll).toHaveBeenCalled();
    expect(scrollResult.pos).toBe(10);
  }));

  it('should call onYScroll with pos change == 10', inject(function(ScrollSpy) {
    scrollTesters.testYScroll(ScrollSpy);
    windowMock.set({y: 10});
    windowMock.trigger();
    expect(scrollTesters.onYScroll).toHaveBeenCalled();
    expect(scrollResult.delta).toBe(10);
  }));

  it('should call onOverscrollHorz when X scroll is larger than scroll width', inject(function(ScrollSpy) {
    scrollTesters.testOverscrollHorz(ScrollSpy);

    windowMock.set({x: 10, sw: 1000});
    windowMock.trigger();
    expect(scrollTesters.onOverscrollHorz).not.toHaveBeenCalled();

    scrollTesters.onOverscrollHorz.reset();
    windowMock.set({x: 1001, sw: 1000});
    windowMock.trigger();
    expect(scrollTesters.onOverscrollHorz).toHaveBeenCalled();
  }));

  it('should call onOverscrollVert when Y scroll is smaller than 0', inject(function(ScrollSpy) {
    scrollTesters.testOverscrollVert(ScrollSpy);

    windowMock.set({y: 10});
    windowMock.trigger();
    expect(scrollTesters.onOverscrollVert).not.toHaveBeenCalled();

    scrollTesters.onOverscrollVert.reset();
    windowMock.set({y: 0});
    windowMock.trigger();
    expect(scrollTesters.onOverscrollVert).not.toHaveBeenCalled();

    scrollTesters.onOverscrollVert.reset();
    windowMock.set({y: -1});
    windowMock.trigger();
    expect(scrollTesters.onOverscrollVert).toHaveBeenCalled();
  }));

});