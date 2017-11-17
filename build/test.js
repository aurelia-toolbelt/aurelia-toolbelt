var gulp = require('gulp');
var run = require('gulp-run');



gulp.task('test', function (callback) {
  run('npm test').exec();
});
