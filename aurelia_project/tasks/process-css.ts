import * as gulp from 'gulp';
// @ts-ignore
import * as changedInPlace from 'gulp-changed-in-place';
// @ts-ignore
import * as project from '../aurelia.json';
import {build} from 'aurelia-cli';
const sass = require('gulp-sass');


export default function processCSS() {
  return gulp.src(project.cssProcessor.source)
    .pipe(changedInPlace({firstPass:true}))
    .pipe(build.bundle());
};

export function pluginCSSCommon() {
  return gulp.src(project.plugin.source.css)
    .pipe(gulp.dest(project.plugin.output + "/commonjs"));
}

export function pluginCSSAMD() {
  return gulp.src(project.plugin.source.css)
    .pipe(gulp.dest(project.plugin.output + "/amd"));
}
export function pluginCSSSystem() {
  return gulp.src(project.plugin.source.css)
    .pipe(gulp.dest(project.plugin.output + "/system"));
}
export function pluginCSSES2015() {
  return gulp.src(project.plugin.source.css)
    .pipe(gulp.dest(project.plugin.output + "/es2015"));
}

export function pluginScssCommon() {
  return gulp.src(project.plugin.source.scss)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest(project.plugin.output + "/commonjs"));
}

export function pluginScssAMD() {
  return gulp.src(project.plugin.source.scss)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest(project.plugin.output + "/amd"));
}
export function pluginScssSystem() {
  return gulp.src(project.plugin.source.scss)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest(project.plugin.output + "/system"));
}
export function pluginScssES2015() {
  return gulp.src(project.plugin.source.scss)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest(project.plugin.output + "/es2015"));
}
