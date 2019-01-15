import * as gulp from 'gulp';
// @ts-ignore
import * as changedInPlace from 'gulp-changed-in-place';
// @ts-ignore
import * as project from '../aurelia.json';
import {build} from 'aurelia-cli';

export default function processJson() {
  return gulp.src(project.jsonProcessor.source)
    .pipe(changedInPlace({firstPass:true}))
    .pipe(build.bundle());
}
