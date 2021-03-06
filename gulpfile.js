var babel = require('gulp-babel');
var del = require('del');
var gulp = require('gulp');
var gulpBrowser = require('gulp-browser');
var reactify = require('reactify');
var sass = require('gulp-sass');
var size = require('gulp-size');
var uglify = require('gulp-uglify');

var paths = {
    jsx: './typesetter/static/jsx/*.js*',
    js: './typesetter/static/js/',
    sass: './typesetter/static/sass/*.scss',
    css: './typesetter/static/css/'
};


gulp.task('clean', function() {
    return del([paths.js, paths.css]);
});


gulp.task('sass', function () {
    return gulp.src(paths.sass)
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest(paths.css))
        .pipe(size());
});


gulp.task('jsx', function() {
    var stream = gulp.src(paths.jsx)
        .pipe(gulpBrowser.browserify({transform: ['reactify']}))
        // Convert .jsx to .js
        .pipe(babel({}))
        .pipe(uglify())
        .pipe(gulp.dest(paths.js))
        .pipe(size());

    return stream;
});


gulp.task('watch', function() {
    gulp.watch(paths.jsx, ['jsx']);
    gulp.watch(paths.sass, ['sass']);
});


gulp.task('default', ['sass', 'jsx']);
