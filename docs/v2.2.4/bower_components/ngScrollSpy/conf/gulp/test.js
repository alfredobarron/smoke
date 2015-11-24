'user strict';

var gulp = require("gulp");
var plugins = require("gulp-load-plugins")();
var sequence = require('run-sequence');
var conf = require('./config.js');

gulp.task('single-test', function() {
  return gulp.src(conf.test.concat(conf.local.testscripts))
    .pipe(plugins.karma({
      configFile: conf.karmaunit,
      action: 'run'
    }));
});

gulp.task('continous-test', function() {
  return gulp.src(conf.test.concat(conf.local.testscripts))
    .pipe(plugins.karma({
      configFile: conf.karmaunit,
      action: 'watch'
    }));
});

gulp.task('test', function(cb) {
  sequence(
    'lint',
    'single-test',
    'notify-on-unittest',
    cb);
});

gulp.task('test-watch', function(cb) {
  sequence(
    'lint',
    'continous-test',
    'notify-on-unittest',
    cb);
});
