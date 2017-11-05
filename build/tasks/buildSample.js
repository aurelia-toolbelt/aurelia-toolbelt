var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var assign = Object.assign || require('object.assign');
var merge = require('merge2');
var paths = require('../pathsSample');
var changed = require('gulp-changed');
var runSequence = require('run-sequence');


var tsProjectSystem = ts.createProject('./sample/tsconfig.json', {
  typescript: require('typescript'),
  "declaration": true,
  target: 'es5',
  module: 'system'
});


function build(tsProject, outputPath) {
  var tsResult = gulp.src(paths.dtsSrc.concat(paths.source))
    .pipe(plumber())
    .pipe(changed(outputPath, {
      extension: '.ts'
    }))
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(tsProject());

  return merge([ // Merge the two output streams, so this task is finished when the IO of both operations is done. 
      tsResult.dts.pipe(gulp.dest(outputPath)),
      tsResult.js.pipe(gulp.dest(outputPath))
    ])
    .pipe(sourcemaps.write('.', {
      includeContent: false,
      sourceRoot: paths.root
    }))
    .pipe(gulp.dest(outputPath))
}


gulp.task('sample-system', function () {
  return build(tsProjectSystem, paths.output);
});



gulp.task('sample-html', function () {
  return gulp.src(paths.html)
    .pipe(gulp.dest(paths.output));
});


gulp.task('sample-css', function () {
  return gulp.src(paths.css)
    .pipe(gulp.dest(paths.output));
});


gulp.task('sample-json', function () {
  return gulp.src(paths.json)
    .pipe(gulp.dest(paths.output));
});


gulp.task('sample-woff2', function () {
  return gulp.src(paths.woff2)
    .pipe(gulp.dest(paths.output));
});





gulp.task('sample-build', function (callback) {
  return runSequence(
    'clean-sample', ['sample-json', 'sample-woff2', 'sample-css', 'sample-html', 'sample-system'],
    callback
  );
});


