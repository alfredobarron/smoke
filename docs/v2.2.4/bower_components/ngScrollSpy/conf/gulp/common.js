'use strict';

var gulp = require("gulp");
var plugins = require("gulp-load-plugins")();
var stylish = require('jshint-stylish');
var conf = require('./config.js');

gulp.task('lint', function() {
	return gulp.src(conf.local.scripts)
		.pipe(plugins.jshint())
		.pipe(plugins.jshint.reporter(stylish));
});

gulp.task('notify-on-build', function() {
	return gulp.src('', {read: false}).pipe(plugins.notify('Build finished'));
});

gulp.task('notify-on-unittest', function() {
	return gulp.src('', {read: false}).pipe(plugins.notify('Unit tests finished'));
});
