var gulp = require('gulp'),
	gutil = require('gulp-util'),
	coffee = require('gulp-coffee');
	
	coffeeScripts = ['components/coffee/*.coffee']

gulp.task('coffee', function(){
	gulp.src()
	.pipe(coffee({bare: true})
	.on('error', gutil.log))
	.pipe(gulp.dest('components/scripts'))
});