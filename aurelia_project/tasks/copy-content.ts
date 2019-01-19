var gulpCopy = require("gulp-copy");
var sourceFiles = ["source1/*", "source2/*.txt"];
var destination = "dest/";
var outputPath = "some-other-dest/";
// @ts-ignore
import * as project from "../aurelia.json";
import * as gulp from "gulp";
const path = require("path");
const fs = require("fs");

const reducer = function(a, b) {
  
if(a && !b)
return a;


if(!a && b)
return b;


if(!a && !b)
return "";

 return a + "," + b;

} 




function getDirectories(path) {
  var dirs: Array<string> = [];
  fs.readdirSync(path).forEach(file => {
    dirs.push(file);
  });
  return dirs;
}
export function processContentTypes() {
  return createContentTypes();
}
export function processContentFiles() {
  return createContentFiles();
}

function createContentTypes() {
  var arr = [];
  let dirs = getDirectories(project.plugin.projects);
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
  let dirs = getDirectories(project.plugin.projects);
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
