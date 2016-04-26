var gulp     = require('gulp'),
	concat   = require('gulp-concat'),
	rename   = require('gulp-rename'),
	uglify   = require("gulp-uglify"),
	cleancss = require('gulp-clean-css'),
	jshint   = require('gulp-jshint');

gulp.task('javascript', function() {
	return gulp.src('src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter())
		.pipe(concat('jquery.koha.flipster.js'))
		.pipe(gulp.dest('dist/'))
		.pipe(uglify())
		.pipe(rename({ extname: '-min.js' }))
		.pipe(gulp.dest('dist/'));
});

gulp.task('css', function() {
	return gulp.src('src/*.css')
		.pipe(concat('jquery.koha.flipster.css'))
		.pipe(gulp.dest('dist/'))
		.pipe(cleancss())
		.pipe(rename({ extname: '-min.css' }))
		.pipe(gulp.dest('dist/'));
});

gulp.task('watch', function() {
	gulp.watch('src/*.*', ['css','javascript']);
});

gulp.task('default', ['css','javascript','watch']);