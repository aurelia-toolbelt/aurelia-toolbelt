var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var assign = Object.assign || require('object.assign');
var merge = require('merge2');
var paths = require('../pathsBuild');
var changed = require('gulp-changed');
var runSequence = require('run-sequence');


var tsProjectAMD = ts.createProject('./tsconfig.json', {
  typescript: require('typescript'),
  "declaration": true,
  target: 'es5',
  module: 'amd'
});


var tsProjectES6 = ts.createProject('./tsconfig.json', {
  typescript: require('typescript'),
  "declaration": true
});


var tsProjectCJS = ts.createProject('./tsconfig.json', {
  typescript: require('typescript'),
  "declaration": true,
  target: 'es5',
  module: 'commonjs'
});


var tsProjectSystem = ts.createProject('./tsconfig.json', {
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


gulp.task('build-es2015', function () {
  return build(tsProjectES6, paths.output + 'es2015');
});


gulp.task('build-commonjs', function () {
  return build(tsProjectCJS, paths.output + 'commonjs');
});


gulp.task('build-amd', function () {
  return build(tsProjectAMD, paths.output + 'amd');
});


gulp.task('build-system', function () {
  return build(tsProjectSystem, paths.output + 'system');
});


gulp.task('build-html', function () {
  return gulp.src(paths.html)
    .pipe(gulp.dest(paths.output + 'es2015'))
    .pipe(gulp.dest(paths.output + 'commonjs'))
    .pipe(gulp.dest(paths.output + 'amd'))
    .pipe(gulp.dest(paths.output + 'system'));
});


gulp.task('build-css', function () {
  return gulp.src(paths.css)
    .pipe(gulp.dest(paths.output + 'es2015'))
    .pipe(gulp.dest(paths.output + 'commonjs'))
    .pipe(gulp.dest(paths.output + 'amd'))
    .pipe(gulp.dest(paths.output + 'system'));
});


gulp.task('build-json', function () {
  return gulp.src(paths.json)
    .pipe(gulp.dest(paths.output + 'es2015'))
    .pipe(gulp.dest(paths.output + 'commonjs'))
    .pipe(gulp.dest(paths.output + 'amd'))
    .pipe(gulp.dest(paths.output + 'system'));
});


gulp.task('build-woff2', function () {
  return gulp.src(paths.woff2)
    .pipe(gulp.dest(paths.output + 'es2015'))
    .pipe(gulp.dest(paths.output + 'commonjs'))
    .pipe(gulp.dest(paths.output + 'amd'))
    .pipe(gulp.dest(paths.output + 'system'));
});





gulp.task('build', function (callback) {
  return runSequence(
    'clean-build', ['build-json', 'build-woff2', 'build-css', 'build-html', 'build-es2015', 'build-amd', 'build-system', 'build-commonjs'],
    callback
  );
});

