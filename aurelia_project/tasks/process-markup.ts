import * as gulp from 'gulp';
// @ts-ignore
import * as changedInPlace from 'gulp-changed-in-place';
// @ts-ignore
import * as project from '../aurelia.json';
import {build} from 'aurelia-cli';

export default function processMarkup() {
  return gulp.src(project.markupProcessor.source)
    .pipe(changedInPlace({firstPass:true}))
    .pipe(build.bundle());
}

export function pluginMarkupCommon() {
  return gulp.src(project.plugin.source.html)
    .pipe(gulp.dest(project.plugin.output + "/commonjs"));
}
export function pluginMarkupSystem() {
  return gulp.src(project.plugin.source.html)
    .pipe(gulp.dest(project.plugin.output + "/system"));
}
export function pluginMarkupAMD() {
  return gulp.src(project.plugin.source.html)
    .pipe(gulp.dest(project.plugin.output + "/amd"));
}
export function pluginMarkupES2015() {
  return gulp.src(project.plugin.source.html)
    .pipe(gulp.dest(project.plugin.output + "/es2015"));
}
