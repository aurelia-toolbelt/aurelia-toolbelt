// code used by "gulp watch" and "gulp build"

var gulp = require('gulp');

var pathsBuild = require('./paths');
var del = require('del');
var vinylPaths = require('vinyl-paths');



gulp.task('clean-build', function() {
  return gulp.src([pathsBuild.output])
    .pipe(vinylPaths(del));
});


