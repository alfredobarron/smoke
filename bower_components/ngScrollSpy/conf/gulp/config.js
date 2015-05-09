'use strict';

var packagejson = require('../../package.json');
var buildorder= require('../build/order.js').files;

module.exports = {
	licence: 'LICENSE.min',
	dist: {
		root: 'dist',
		name: packagejson.name
	},

	local: {
		root: 'src',
		local: 'src/**/*',
	  scripts: inject('src/', buildorder).concat([
	  	'!src/**/*.spec.js',
	  	'!src/**/*.mock.js'
	  ]),
	  testscripts:
	  	[
	  		'bower_components/angular/angular.js',
	  		'bower_components/angular-mocks/angular-mocks.js',
	  		'conf/build/mod.mock.js'
	  	]
	  	.concat(inject('src/', buildorder))
	  	.concat([
	  		'src/**/*.mock.js',
	  		'src/**/*.spec.js'
	  	]),
  },

  test: [],

  karmaunit: 'conf/test/karma.js',
  build: 'conf/build/'
};

function inject(r, o) {
	var edit= function(v) {
		var i = v.indexOf('ROOT');
		if( i > -1 ) {
			return v.replace('ROOT', r);
		} else {
			return r + v;
		}

	};

	if(o instanceof Array) {
		var n= [];
		o.forEach(function(e) {
			n.push(edit(e));
		});
		return n;
	} else {
		var n= {};
		for (var k in o) {
			n[k]= edit(o[k]);
		}
		return n;
	}
};
