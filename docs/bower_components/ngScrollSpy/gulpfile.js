'use strict';

var gulp= require('gulp');
var plugins = require("gulp-load-plugins")();
require('./conf/gulp/common.js');
require('./conf/gulp/test.js');
require('./conf/gulp/build.js');

var conf = require('./conf/gulp/config.js');

gulp.task('watch', function () {
    plugins.watch({glob: conf.local.local}, function(files) {
    	return gulp.run('build');
    });
});

gulp.task('watch-test', function () {
    plugins.watch({glob: conf.local.local}, function(files) {
    	return gulp.run('single-test');
    });
});

gulp.task('default', ['build']);