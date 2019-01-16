import * as gulp from 'gulp';
// @ts-ignore
import * as changedInPlace from 'gulp-changed-in-place';
// @ts-ignore
import * as project from '../aurelia.json';
import { build } from 'aurelia-cli';
const path = require('path');
const fs = require('fs');

function getDirectories(path) {
  var dirs: Array<string> = [];
  fs.readdirSync(path).forEach(file => {
    dirs.push(file);
  });
  return dirs;
}

export default function processMarkup() {
  return gulp
    .src(project.markupProcessor.source)
    .pipe(changedInPlace({ firstPass: true }))
    .pipe(build.bundle());
}

export function pluginMarkup() {
  return createMarkup();
}

function createMarkup() {
  var arr = [];
  let dirs = getDirectories(project.plugin.projects);
  let compileTypes = project.plugin.compileTypes;
  for (let i = 0; i < dirs.length; i++) {
    let dir = project.plugin.projects + '/' + dirs[i] + '/**/*.html';
    for (let j = 0; j < compileTypes.length; j++) {
      arr.push(
        gulp
          .src(dir)
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
