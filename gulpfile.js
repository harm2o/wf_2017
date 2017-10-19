var gulp = require('gulp'),
	gutil = require('gulp-util'),
	concat = require('gulp-concat'),
	browserify = require('gulp-browserify'),
	path = require('path'),
	compass = require('gulp-compass'),
	connect = require('gulp-connect'),
	coffee = require('gulp-coffee');
	
var	coffeeScripts = ['components/coffee/*.coffee']
var	jsSources = [
	'components/scripts/rclick.js',
	'components/scripts/pixgrid.js',
	'components/scripts/tagline.js',
	'components/scripts/template.js'
	];

gulp.task('coffee', function(){
	gulp.src(coffeeScripts)
	.pipe(coffee({bare: true})
	.on('error', gutil.log))
	.pipe(gulp.dest('components/scripts'))
});

gulp.task('js', function(){
	gulp.src(jsSources)
	.pipe(concat('script.js'))
	.pipe(browserify())
	.pipe(gulp.dest('builds/developement/js'))
	.pipe(connect.reload())
});

gulp.task('compass', function() {
  gulp.src('components/sass/style.scss')
    .pipe(compass({
        sass: 'components/sass',
		img: 'builds/developement/img',
		css: 'builds/developement/css',
        style: 'expanded'
    }))
	.on('error', gutil.log)
    .pipe(gulp.dest('builds/developement/css'))
	.pipe(connect.reload())
});

gulp.task('html', function(){
	gulp.src('builds/developement/*.html')
	.pipe(connect.reload())
});

gulp.task('json', function(){
	gulp.src('builds/developement/js/*.json')
	.pipe(connect.reload())
});

gulp.task('watcher',function(){
	gulp.watch('components/coffee/*.coffee', ['coffee']);
	gulp.watch('components/scripts/*.js', ['js']);
	gulp.watch('components/sass/*.scss', ['compass']);
	gulp.watch('builds/developement/*.html', ['html']);
	gulp.watch('builds/developement/js/*.json', ['json']);
})

gulp.task('connect', function(){
	connect.server({
		root: 'builds/developement/',
		livereload: true
	});
});

gulp.task('default',['html','json','coffee','js','compass','connect','watcher']);


