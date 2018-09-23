const gulp = require('gulp');
const run = require('gulp-run');



gulp.task('test', function (callback) {
  run('npm test').exec();
});
