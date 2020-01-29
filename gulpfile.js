const gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync').create(),
	useref = require('gulp-useref'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	cssnano = require('gulp-cssnano'),
	uglify = require('gulp-uglify'),
	gulpIf = require('gulp-if'),
	imagemin = require('gulp-imagemin'),
	cache = require('gulp-cache'),
	del = require('del'),
    c = require('ansi-colors'),
    log = require('fancy-log');

	
	async function style() {
		log(c.green('Compiling "sass" to "css" files')); 
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

    async function watch() {
	  	log(c.green('Browser sync is init and gulp start watch for changes "scss", "js", "php" files')); 
    	browserSync.init({
	       // open:'external',
	       proxy:'http://localhost/gulp-template/dev',
	       port:8080
	    });

	  	gulp.watch('dev/scss/**/*.scss', style);
	  	gulp.watch('dev/**/*.php').on('change', browserSync.reload);
	  	gulp.watch('dev/js/**/*.js').on('change', browserSync.reload);
	}

	async function useReference() {
	  	log(c.green('Minify "css" and "js" files and copy them to dist folder')); 
	  	return gulp.src('dev/*.php')
	    .pipe(useref())
	    .pipe(gulpIf('*.js', uglify()))
	    .pipe(gulpIf('*.css', cssnano()))
	    .pipe(gulp.dest('dist'));
	}

	async function images() {
    	log(c.green('Compress and cash images')); 
    	return gulp.src('dev/images/**/*.+(png|jpg|jpeg|gif|svg)')
		.pipe(cache(imagemin({
      		interlaced: true,
      		progressive: true,
      		optimizationLevel: 5
    	})))
    	.pipe(gulp.dest('dist/images'))
    }

	async function fonts() {
  		log(c.green('Copy Fonts')); 
  	    return gulp.src('dev/fonts/**/*.*')
    	.pipe(gulp.dest('dist/fonts'))
	}

	async function clearCashedImages() {
	  	log(c.green('Clear cashed images')); 
	  	return cache.clearAll();
	}

	async function removeDist() {
	  	log(c.green('Remove "dist" directory and his inner folders and files')); 
	  	return del.sync('dist');
	}

	async function emptyDist() {
	  	log(c.green("Empty dist folder but doesn't clear cashed images")); 
	  	return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
	}
	
	
	exports.deleteDist = gulp.parallel(clearCashedImages, removeDist); // This task delete dist folder and cashed  compressed images
	exports.default =  gulp.series(style, watch)
	exports.build =  gulp.series(emptyDist, style, gulp.parallel(useReference, images, fonts));

