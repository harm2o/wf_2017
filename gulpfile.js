var gulp = require('gulp'),
	gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
	concat = require('gulp-concat'),
	path = require('path'),
	compass = require('gulp-compass'),
	connect = require('gulp-connect'),
	gulpif = require('gulp-if'),
	env = require('gulp-environment'),
	uglify = require('gulp-uglify'),
	htmlmin = require('gulp-htmlmin'),
	jsonminify = require('gulp-jsonminify'),
	browserify = require('gulp-browserify');
	
var env,
	coffeeSources,
	jsSources,
	sassSources,
	htmlSources,
	jsonSources,
	outputDir,
	sassStyle;
	
	env = process.env.NODE_ENV || 'production';
	
	if (env ==='developement') {
		outputDir = 'builds/developement/';
		sassStyle = 'expanded';
	} else {
		outputDir = 'builds/production/';
		sassStyle = 'compressed';
	}
	
	
	coffeeSources = ['components/coffee/*.coffee']
	jsSources = [
		'components/scripts/rclick.js',
		'components/scripts/pixgrid.js',
		'components/scripts/tagline.js',
		'components/scripts/template.js'
	];
	sassSources = ['components/sass/style.scss']
	htmlSources = [outputDir + '*.html']
	jsonSources = [outputDir + 'js/*.json']

gulp.task('coffee', function(){
	gulp.src(coffeeSources)
	.pipe(coffee({bare: true})
	.on('error', gutil.log))
	.pipe(gulp.dest('components/scripts'))
});

gulp.task('js', function(){
	gulp.src(jsSources)
	.pipe(concat('script.js'))
	.pipe(browserify())
	.pipe(gulpif(env === 'production', uglify()))
	.pipe(gulp.dest(outputDir + 'js'))
	.pipe(connect.reload())
});

gulp.task('uglify', function(){
	gulp.src(jsSources)
	.pipe(concat('script.js'))
	.pipe(uglify())
	.pipe(gulp.dest(outputDir + 'js'))
});

gulp.task('compass', function() {
  gulp.src(sassSources)
    .pipe(compass({
        sass: 'components/sass',
		img: outputDir + 'img',
		css: outputDir + 'css',
        style: sassStyle
    }))
	.on('error', gutil.log)
    .pipe(gulp.dest(outputDir + 'css'))
	.pipe(connect.reload())
});

gulp.task('html', function(){
	gulp.src('builds/developement/*.html')
	.pipe(gulpif(env === 'production', htmlmin({collapseWhitespace: true})))
	.pipe(gulpif(env === 'production', gulp.dest(outputDir)))
	.on('error', gutil.log)
	.pipe(connect.reload())
});

gulp.task('json', function(){
	gulp.src('builds/developement/js/*.json')
	.pipe(gulpif(env === 'production', jsonminify()))
	.pipe(gulpif(env === 'production', gulp.dest(outputDir + 'js')))
	.pipe(connect.reload())
});

gulp.task('log', function(){
	gutil.log(env);
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

// um in die Produktionsumgebung zu deployen schreibt man im Terminal:
// $ NODE_ENV-production gulp
// process.env.NODE_ENV = 'production';
