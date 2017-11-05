var gulp = require('gulp');
var path = require('path');
var browserSync = require('browser-sync');
var paths = require('../pathsSample');

gulp.task('serve', ['dev-build', 'sample-build'], function(done) {
  var bs = browserSync.create('Sample server');

  var options = {
    server: {
      baseDir: ['./sample'],
      routes: {
        '/root/': './'
      }
    },
    ghostMode:false,
    open:false
  };

  // Create a route to the build output directory so we can load the plugin from the subdir
  options.server.routes['/dist/' + paths.packageName] = paths.plugin;
  bs.init(options, done);
});
