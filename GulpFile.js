/// <binding BeforeBuild='prod' ProjectOpened='watch' />
var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var cleanCss = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');

var Root = 'katalyst-web/Content/';
var paths = {
    src: {
        scss: Root + 'style/sass/'
    },
    prod: {
        css: Root + 'style/css/'
    }
};

var onError = function (err) {
    gutil.beep();
    this.emit('end');
    gutil.log(err);
};

gulp.task('styles_mapped', function () {
    return gulp.src(paths.src.scss + '*.scss')
        .pipe(plumber({ errorHandler: onError }))
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'nested' }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.prod.css));
});

gulp.task('styles_minified', function () {
    return gulp.src(paths.src.scss + '*.scss')
        .pipe(plumber({ errorHandler: onError }))
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(cleanCss({ compatibility: 'ie11' }))
        .pipe(gulp.dest(paths.prod.css));
});

gulp.task('watch', ['styles_minified'], function () {
    gulp.watch(paths.src.scss + '**/*.scss', ["styles_minified"]);
});

gulp.task('default', ['styles_minified']);