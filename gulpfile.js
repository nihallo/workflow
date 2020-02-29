var gulp = require('gulp'),
	gutil = require('gulp-util'),
	coffee = require('gulp-coffee'),
	browserify = require('gulp-browserify'),
	compass = require('gulp-compass'),
	connect = require('gulp-connect'),
	concat = require('gulp-concat');

var coffeeSources = ['components/coffee/tagline.coffee']
var jsSources = [
	'components/scripts/rclick.js',
	'components/scripts/pixgrid.js',
	'components/scripts/tagline.js',
	'components/scripts/template.js'
];

var sassSources = ['components/sass/style.scss'];

gulp.task('coffee',async function(){
	gulp.src(coffeeSources)
	.pipe(coffee({bare:true}))
		.on('error',gutil.log)
	.pipe(gulp.dest('components/scripts'))
});

gulp.task('js',async function(){
	gulp.src(jsSources)
		.pipe(concat('script.js'))
		.pipe(browserify())
		.pipe(gulp.dest('builds/development/js'))
		.pipe(connect.reload())
});

gulp.task('compass',async function(){
	gulp.src(sassSources)
		.pipe(compass({
			sass: 'components/sass',
			image: 'builds/development/image',
			style: 'expanded'
		}))
		.on('error', gutil.log)
		.pipe(gulp.dest('builds/development/css'))
		.pipe(connect.reload())
});

gulp.task('watch', async function(){
	gulp.watch(coffeeSources, gulp.series('coffee'));
	gulp.watch(jsSources, gulp.series('js'));
	gulp.watch('components/sass/*.scss', gulp.series('compass'))

});

gulp.task('connect', function(){
	connect.server({
		root: 'builds/development/',
		livereload:true
	});
});

gulp.task('default',gulp.series('coffee','js','compass','watch','connect'));