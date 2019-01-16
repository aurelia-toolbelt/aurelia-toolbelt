import * as gulp from 'gulp';
// @ts-ignore
import * as changedInPlace from 'gulp-changed-in-place';
// @ts-ignore
import * as plumber from 'gulp-plumber';
// @ts-ignore
import * as sourcemaps from 'gulp-sourcemaps';
// @ts-ignore
import * as notify from 'gulp-notify';
// @ts-ignore
import * as rename from 'gulp-rename';
// @ts-ignore
import * as ts from 'gulp-typescript';
// @ts-ignore
import * as project from '../aurelia.json';
import { CLIOptions, build } from 'aurelia-cli';
import * as eventStream from 'event-stream';
const fs = require('fs');
const path = require('path');
let dirs = getDirectories(project.plugin.projects);

function getDirectories(path) {
  var dirs: Array<string> = [];
  fs.readdirSync(path).forEach(file => {
    dirs.push(file);
  });
  return dirs;
}

function configureEnvironment() {
  let env = CLIOptions.getEnvironment();

  return gulp
    .src(`aurelia_project/environments/${env}.ts`)
    .pipe(changedInPlace({ firstPass: true }))
    .pipe(rename('environment.ts'))
    .pipe(gulp.dest(project.paths.root));
}

var typescriptCompiler = typescriptCompiler || null;

function buildTypeScript() {
  typescriptCompiler = ts.createProject('tsconfig.json', {
    typescript: require('typescript')
  });

  let dts = gulp.src(project.transpiler.dtsSource);

  let src = gulp
    .src(project.transpiler.source)
    .pipe(changedInPlace({ firstPass: true }));

  return eventStream
    .merge(dts, src)
    .pipe(
      plumber({ errorHandler: notify.onError('Error: <%= error.message %>') })
    )
    .pipe(sourcemaps.init())
    .pipe(typescriptCompiler())
    .pipe(sourcemaps.write({ sourceRoot: 'src' }))
    .pipe(build.bundle());
}

export default gulp.series(configureEnvironment, buildTypeScript);

export function transpilePlugin() {
  return createScripts();
}

function createScripts() {
  var arr = [];
  let dirs = getDirectories(project.plugin.projects);
  let compileTypes = project.plugin.compileTypes;
  for (let i = 0; i < dirs.length; i++) {
    for (let j = 0; j < compileTypes.length; j++) {
      const typescriptCompiler = ts.createProject('tsconfig.json', {
        typescript: require('typescript'),
        allowJs: false,
        declaration: true, // write d.ts files
        module: compileTypes[j] // note we use commonjs format
      });

      let dts = gulp.src(project.transpiler.dtsSource);
      let src = gulp.src('src/projects/' + dirs[i] + '/**/*.ts');

      arr.push(
        eventStream
          .merge(dts, src)
          .pipe(
            plumber({
              errorHandler: notify.onError('Error: <%= error.message %>')
            })
          )
          .pipe(sourcemaps.init())
          .pipe(typescriptCompiler())
          .pipe(sourcemaps.write({ sourceRoot: 'src' }))
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
