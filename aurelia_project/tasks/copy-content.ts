var gulpCopy = require("gulp-copy");
// @ts-ignore
import * as project from "../aurelia.json";
import * as gulp from "gulp";
import {default as projects} from './get-projects';

const reducer = function(a, b) {
  if(a && !b)
    return a;
  if(!a && b)
    return b;
  if(!a && !b)
    return "";
 return a + "," + b;
} 

export function processContentTypes() {
  return createContentTypes();
}
export function processContentFiles() {
  return createContentFiles();
}

function createContentTypes() {
  var arr = [];
  let dirs = projects();
  // let compileTypes = project.plugin.compileTypes;
  for (let i = 0; i < dirs.length; i++) {
    var len = project.plugin.copyTypes.length;
    let dir = "";
    if(len <= 0)
      return;
    if(len == 1)
      dir = project.plugin.projects + "/" + dirs[i] + "/**/*." + project.plugin.copyTypes[0];
    if(len > 1)
      dir = project.plugin.projects + "/" + dirs[i] + "/**/*.{" + project.plugin.copyTypes.reduce(reducer) + "}";
      arr.push(
        gulp.src(dir).pipe(gulpCopy(project.plugin.output, { prefix: 2 }))
      );
  }
  return arr;
}
function createContentFiles() {
  var arr = [];
  let dirs = projects();
  // let compileTypes = project.plugin.compileTypes;
  for (let i = 0; i < dirs.length; i++) {
    var len = project.plugin.copyFiles.length;
    let dir = "";
    if(len <= 0)
      return;
    if(len == 1)
      dir = project.plugin.projects + "/" + dirs[i] + "/**/" + project.plugin.copyFiles[0];
    if(len > 1)
      dir = project.plugin.projects + "/" + dirs[i] + "/**/{" + project.plugin.copyFiles.reduce(reducer) + "}";
      arr.push(
        gulp.src(dir).pipe(gulpCopy(project.plugin.output, { prefix: 2 }))
      );
  }
  return arr;
}
