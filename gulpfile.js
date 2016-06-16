var babel = require('gulp-babel');
var del = require('del');
var gulp = require('gulp');
var gulpBrowser = require('gulp-browser');
var size = require('gulp-size');
var reactify = require('reactify');


gulp.task('default', ['clean'], function() {
    gulp.start('transform');
});

gulp.task('clean', function() {
    return del(['./typesetter/static/scripts/js']);
});

gulp.task('transform', function() {
    var stream = gulp.src('./typesetter/static/scripts/jsx/*.jsx')
        .pipe(gulpBrowser.browserify({transform: ['reactify']}))
        // Convert .jsx to .js
        .pipe(babel({}))
        .pipe(gulp.dest('./typesetter/static/scripts/js/'))
        .pipe(size());

    return stream;
});
