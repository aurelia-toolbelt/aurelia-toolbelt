import * as gulp from 'gulp';
// @ts-ignore
import { Server as Karma } from 'karma';
import { CLIOptions } from 'aurelia-cli';
import build from './build';
import watch from './watch';
import * as path from 'path';

let karma = done => {
  new Karma(
    {
      configFile: path.join(__dirname, '/../../karma.conf.js'),
      singleRun: !CLIOptions.hasFlag('watch')
    },
    err => {
      done();
      if (err) {
        process.exit(err);
      }
    }
  ).start();
};

let unit;

if (CLIOptions.hasFlag('watch')) {
  unit = gulp.series(
    build,
    gulp.parallel(done => {
      watch(() => {});
      done();
    }, karma)
  );
} else {
  unit = gulp.series(build, karma);
}

export { unit as default };
