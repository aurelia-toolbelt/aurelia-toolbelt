import * as gulp from 'gulp';
// @ts-ignore
import tslint from 'gulp-tslint';
// @ts-ignore
import * as project from '../aurelia.json';

export default function lint() {
  return gulp.src([project.transpiler.source])
    .pipe(tslint({
      tslint: require("tslint"),
      formatter: 'prose'
    }))
    .pipe(tslint.report());
}
