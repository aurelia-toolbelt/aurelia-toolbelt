var gulp = require('gulp');
var chalk = require('chalk');
var run = require('gulp-run');



gulp.task('test', function (callback) {
  run('npm test').exec();
});