// @ts-ignore
import * as project from "../aurelia.json";
const fs = require("fs");

function getDirectories(path) {
  var dirs: Array<string> = [];
  fs.readdirSync(path).forEach(file => {
    dirs.push(file);
  });
  return dirs;
}

export default function(): string[] {
  let dirs = getDirectories(project.plugin.projects);
  if (
    process.argv &&
    process.argv.length > 3 &&
    process.argv[3] === "--projects"
  ) {
    dirs = process.argv.slice(4);
  }
  console.log(dirs);
  return dirs;
}
