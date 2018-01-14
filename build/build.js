// code for "gulp build"


var gulp = require('gulp');
var run = require('gulp-run');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var assign = Object.assign || require('object.assign');
var merge = require('merge2');
var paths = require('./paths');
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
    .pipe(tsProject());

  return merge([ // Merge the two output streams, so this task is finished when the IO of both operations is done. 
      tsResult.dts.pipe(gulp.dest(outputPath)),
      tsResult.js.pipe(gulp.dest(outputPath))
    ])
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





gulp.task('build-run', function (callback) {
  return runSequence(
    'clean-build', ['build-css', 'build-html', 'build-es2015', 'build-amd', 'build-system', 'build-commonjs'],
    callback
  );
});





gulp.task('check-build', function () {
  // get typechecker

  
  var TypeHelper = require( '../sample/node_modules/fuse-box-typechecker').TypeHelper
  var testWatch = TypeHelper({
    tsConfig: './tsconfig.json',
    name: 'Build checking (I throw error and stop build if ts/lint errors is found)',
    basePath: './',
    tsLint: './tslint.json',
    shortenFilenames: true,
    yellowOnLint: true,
    throwOnSyntactic: true, // if you want it to throw error
    throwOnSemantic: true, // if you want it to throw error
    throwOnGlobal: true, // if you want it to throw error
    throwOnOptions: true, // if you want it to throw error
    throwOnTsLint: true // throw on lint errors */
  })

  testWatch.runSync('./src')
  return true;
  
});





gulp.task('build', function (callback) {
  return runSequence(
    'check-build', ['build-run'],
    callback
  );
});


gulp.task('pack', function () {
  return run('npm pack').exec()
    .pipe(gulp.dest('output'));
});

