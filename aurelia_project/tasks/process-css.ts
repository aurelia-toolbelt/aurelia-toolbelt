import * as gulp from 'gulp';
// @ts-ignore
import * as changedInPlace from 'gulp-changed-in-place';
// @ts-ignore
import * as project from '../aurelia.json';
import { build } from 'aurelia-cli';
const sass = require('gulp-sass');
const path = require('path');
const fs = require('fs');

function getDirectories(path) {
  var dirs: Array<string> = [];
  fs.readdirSync(path).forEach(file => {
    dirs.push(file);
  });
  return dirs;
}
export default function processCSS() {
  return gulp
    .src(project.cssProcessor.source)
    .pipe(changedInPlace({ firstPass: true }))
    .pipe(build.bundle());
}

export function pluginCSS() {
  return createCSS();
}

export function pluginScss() {
  return createSCSS();
}

function createCSS() {
  var arr = [];
  let dirs = getDirectories(project.plugin.projects);
  let compileTypes = project.plugin.compileTypes;
  for (let i = 0; i < dirs.length; i++) {
    for (let j = 0; j < compileTypes.length; j++) {
      arr.push(
        gulp
          .src('src/projects/' + dirs[i] + '/**/*.css')
          .pipe(sass.sync().on('error', sass.logError))
          .pipe(
            gulp.dest(
                path.join(project.plugin.output, dirs[i], compileTypes[j])            
            )
          )
      );
    }
  }
  return arr;
}

function createSCSS() {
  var arr = [];
  let dirs = getDirectories(project.plugin.projects);
  let compileTypes = project.plugin.compileTypes;
  for (let i = 0; i < dirs.length; i++) {
    for (let j = 0; j < compileTypes.length; j++) {
      arr.push(
        gulp
          .src('src/projects/' + dirs[i] + '/**/*.scss')
          .pipe(sass.sync().on('error', sass.logError))
          .pipe(
            gulp.dest(
              path.join(project.plugin.output, dirs[i], compileTypes[j])
            )
          )
      );
    }
  }
  return arr;
}
