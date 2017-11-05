var gulp = require('gulp');
var pathsSample = require('../pathsSample');
var pathsBuild = require('../pathsBuild');
var tslint = require('gulp-tslint');
 
/*gulp.task('lint-sample', function() {
  return gulp.src(pathsSample.source)
    .pipe(tslint())
    .pipe(tslint.report());
});

gulp.task('lint-dev', function() {
  return gulp.src(pathsBuild.source)
    .pipe(tslint())
    .pipe(tslint.report());
});

gulp.task('lint-build', function() {
  return gulp.src(pathsBuild.source)
    .pipe(tslint())
    .pipe(tslint.report());
});*/