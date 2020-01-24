const gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync').create(),
	sass = require('gulp-sass'),
	cleanCSS = require('gulp-clean-css'),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require('gulp-concat'),
	imagemin = require('gulp-imagemin'),
	uglify = require('gulp-uglify'),
	del = require('del'),
    c = require('ansi-colors'),
    log = require('fancy-log'),
	imageminGifsicle = require('imagemin-gifsicle'),
	imageminJpegtran = require('imagemin-jpegtran');

	


	function style() {
		log(c.green('Compiling styles')); 
		
		return gulp.src('dev/scss/**/*.scss')
		.pipe(sourcemaps.init({LoadMaps: true}))
		.pipe(sass().on('error',sass.logError))
		.pipe(autoprefixer('last 8 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dev/css'))
	    .pipe(browserSync.reload({ 
      		stream: true
    	}));
    }

    function watch() {
	  	log(c.green('browser sync init')); 
	  	log(c.green('Watching files')); 
    	browserSync.init({
	       // open:'external',
	       proxy:'http://localhost/bash-test/dev',
	       port:8080
	    });

	  	gulp.watch('dev/scss/**/*.scss', style);
	  	gulp.watch('dev/**/*.php', browserSync.reload);
	  	gulp.watch('dev/js/**/*.js', browserSync.reload);
	}

	function images() {
    	return gulp.src('dev/images')
		.pipe(cache(imagemin({
      		interlaced: true,
    	})))
    	.pipe(gulp.dest('dist/images'))
    }

	function fonts() {
  		log(c.green('Copy Fonts')); 
  	    return
  	    gulp.src('dev/fonts/**/*')
    	.pipe(gulp.dest('dist/fonts'))
	}

	function cleanDist () {
	  return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
	}
	
	exports.style = style;
	exports.watch = watch;
	exports.default = gulp.series(style,watch);

