var state = {
	onRun: null,
	state: null,
	store: function(s) {
		for (var k in s) {
			this[k] = s[k];
		}
		this.state = true;
		this.run();
	},
	builder: null,
	setBuilder: function(builder) {
		this.builder = builder;
		this.run();
	},
	run: function() {
		if (this.builder && this.state) {
			this.builder();
			this.builder= null;
			this.state= null;
			if(this.onRun) {
				this.onRun();
				this.onRun= null;
			}
		}
	}
};