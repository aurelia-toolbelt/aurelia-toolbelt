var gulp = require('gulp');
var pathsSample = require('../pathsSample');
var pathsBuild = require('../pathsBuild');
var del = require('del');
var vinylPaths = require('vinyl-paths');

// deletes all files in the output path
gulp.task('clean-sample', function() {
  return gulp.src([pathsSample.output])
    .pipe(vinylPaths(del));
});

gulp.task('clean-build', function() {
  return gulp.src([pathsBuild.output])
    .pipe(vinylPaths(del));
});

gulp.task('clean-dev', function() {
  return gulp.src([pathsBuild.outputDev])
    .pipe(vinylPaths(del));
});


