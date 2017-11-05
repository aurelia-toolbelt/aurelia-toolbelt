var gulp = require('gulp');
var paths = require('../pathsSample');
var pathsDev = require('../pathsBuild');
var browserSync = require('browser-sync');

// outputs changes to files to the console
function reportChange(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

// this task wil watch for changes
// to js, html, and css files and call the
// reportChange method. Also, by depending on the
// serve task, it will instantiate a browserSync session
gulp.task('watch', ['serve'], function() {
  var bs = browserSync.get('Sample server');
  gulp.watch(paths.source, ['sample-system', bs.reload]).on('change', reportChange);
  gulp.watch(paths.html, ['sample-html', bs.reload]).on('change', reportChange);
  gulp.watch(paths.css, ['sample-css', bs.reload]).on('change', reportChange);
  gulp.watch(paths.json, ['sample-json', bs.reload]).on('change', reportChange);
  gulp.watch(paths.woff2, ['sample-woff2', bs.reload]).on('change', reportChange);
  gulp.watch(pathsDev.source, ['dev-system', bs.reload]).on('change', reportChange);
  gulp.watch(pathsDev.html, ['dev-html', bs.reload]).on('change', reportChange);
  gulp.watch(pathsDev.css, ['dev-css', bs.reload]).on('change', reportChange);
  gulp.watch(pathsDev.json, ['dev-json', bs.reload]).on('change', reportChange);
  gulp.watch(pathsDev.woff2, ['dev-woff2', bs.reload]).on('change', reportChange);
  gulp.watch(paths.style, bs.reload).on('change', reportChange);
});