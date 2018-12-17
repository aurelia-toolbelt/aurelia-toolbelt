const gulp = require('gulp');
const uglify = require('gulp-uglify');
const pump = require('pump');

gulp.task('compress', function (cb) {
  pump([
    gulp.src('./sample/dist/*.js'),
    uglify(),
    gulp.dest('./sample/dist/uglifyjs')
  ],
    cb
  );
});
