var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleancss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var render = require('gulp-nunjucks-render');
var del = require('del');
var sequence = require('run-sequence');

gulp.task('reload', function () {
	browserSync.reload();
});

gulp.task('serve', ['sass', 'nunjucks', 'scripts'], function () {
	browserSync({
		server: 'src'
	});

	gulp.watch('src/templates/**/*.nj', ['nunjucks']);
	gulp.watch('src/*.html', ['reload']);
	gulp.watch('src/scss/**/*.scss', ['sass']);
	gulp.watch('src/js/**/*.js', ['scripts']);
});

gulp.task('sass', function () {
	return gulp.src('src/scss/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sassGlob())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 3 versions']
		}))
		.pipe(cleancss())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('src/css'))
		.pipe(browserSync.stream());
});

gulp.task('nunjucks', function () {
	return gulp.src('src/templates/pages/**/*.+(nj|nunjucks)')
		.pipe(render({
			path: ['src/templates']
		}))
		.pipe(gulp.dest('src'));
});

gulp.task('scripts', function () {
	return gulp.src('src/js/scripts/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('src/js'));
});



gulp.task('html', function () {
	return gulp.src('src/**/*.html')
		.pipe(gulp.dest('dist'));
});

gulp.task('css', function () {
	return gulp.src('src/css/**/*.css')
		.pipe(gulp.dest('dist/css'));
});

gulp.task('js', function () {
	return gulp.src('src/js/**/*.js')
		.pipe(gulp.dest('dist/js'));
});

gulp.task('img', function () {
	return gulp.src('src/img/**/*.{jpg,jpeg,png,svg}')
		.pipe(gulp.dest('dist/img'));
});

gulp.task('php', function () {
	return gulp.src('src/**/*.php')
		.pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
	return del(['dist']);
});

gulp.task('build', function () {
	sequence('clean', ['html', 'css', 'js', 'img', 'php']);
});

gulp.task('default', ['serve']);