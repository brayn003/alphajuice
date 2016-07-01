var gulp = require('gulp'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	browserSync = require('browser-sync').create();

var lib = {
		'vendor': {
			'js' : [
				'./bower_components/angular/angular.js',
				'./bower_components/phaser/build/phaser.js'
			]
		}
	};

gulp.task('vendor',function(){
	gulp.src(lib.vendor.js)
	.pipe(concat('vendor.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./app/js/'));
});

gulp.task('html',function(){
	gulp.src('./templates/**/*.html')
	.pipe(gulp.dest('./app/templates/'));
	// .pipe(browserSync.reload());
	browserSync.reload();
	// .pipe(browserSync.reload());
});

gulp.task('sass',function(){
	gulp.src('./sass/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('./app/css/'))
	.pipe(browserSync.stream());
});

gulp.task('js',function(){
	gulp.src('./templates/**/*.js')
	// .pipe(uglify())
	.pipe(gulp.dest('./app/templates/'));
	browserSync.reload();
	// .pipe(browserSync.stream());
});

gulp.task('ijs',function(){
	gulp.src('./js/**/*.js')
	// .pipe(uglify())
	.pipe(gulp.dest('./app/js/'));
	browserSync.reload();
	// .pipe(browserSync.stream());
});

gulp.task('root',function(){
	gulp.src('./root/**/*')
	.pipe(gulp.dest('./app/'));
	browserSync.reload();
});

gulp.task('serve',function(){
	browserSync.init({
		'server': {
			'baseDir': './app/'
		}
	});
	gulp.watch('./templates/**/*.html', ['html']);
	gulp.watch('./sass/*.scss', ['sass']);
	gulp.watch('./templates/*.js', ['js']);
	gulp.watch('./js/**/*.js', ['ijs']);
	gulp.watch('./root/**/*', ['root']);
});


gulp.task('default',['vendor','root','html','ijs','js','sass','serve']);
