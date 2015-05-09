'user strict';

var gulp = require("gulp");
var plugins = require("gulp-load-plugins")();
var sequence = require('run-sequence');
var stripdebug = require('gulp-strip-debug');
var fs = require('fs');

var conf = require('./config.js');

gulp.task('clean', function() {
	return gulp.src(conf.dist.root, {read: false})
		.pipe(plugins.clean());
});

gulp.task('build-normal', function() {
	return gulp.src(conf.local.scripts)
		.pipe(stripdebug())
		.pipe(plugins.concat(conf.dist.name + '.js'))
		.pipe(plugins.wrap({ src: conf.build + 'wrapper.js'}, {namespace: conf.dist.name}))
		.pipe(plugins.header('/*\n' + fs.readFileSync(conf.licence, "utf8") + '\n*/\n'))
		.pipe(gulp.dest(conf.dist.root));
});

gulp.task('build-min', function() {
	return gulp.src(conf.local.scripts)
		.pipe(stripdebug())
		.pipe(plugins.concat(conf.dist.name + '.min.js'))
		.pipe(plugins.wrap({ src: conf.build + 'wrapper.js'}, {namespace: conf.dist.name}))
		.pipe(plugins.ngmin())
		.pipe(plugins.uglify())
		.pipe(plugins.header('/*\n' + fs.readFileSync(conf.licence, "utf8") + '\n*/\n'))
		.pipe(gulp.dest(conf.dist.root));
});

gulp.task('build-debug', function() {
	return gulp.src(conf.local.scripts)
		.pipe(plugins.concat(conf.dist.name + '.debug.js'))
		.pipe(plugins.wrap({ src: conf.build + 'wrapper.js'}, {namespace: conf.dist.name}))
		.pipe(plugins.header('/*\n' + fs.readFileSync(conf.licence, "utf8") + '\n*/\n'))
		.pipe(gulp.dest(conf.dist.root));
});

gulp.task('build', function(cb) {
	sequence(
		'clean',
		[
			'lint',
			'build-normal',
			'build-min',
			'build-debug'
		],
		[
			'notify-on-build'
		],
		cb);
});
