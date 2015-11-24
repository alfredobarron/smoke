mod.service('ScrollSpy', function($window) {
	var rawData= function(w) {
		// retrieve interesting data
		var raw= {
			width: w.innerWidth,
			height: w.innerHeight,
			maxWidth: w.document.body.scrollWidth,
			maxHeight: w.document.body.scrollHeight,
			posX: w.scrollX || w.pageXOffset || w.document.documentElement.scrollLeft,
			posY: w.scrollY || w.pageYOffset || w.document.documentElement.scrollTop
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