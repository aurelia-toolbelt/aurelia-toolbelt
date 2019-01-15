import * as gulp from "gulp";
// @ts-ignore
import * as changedInPlace from "gulp-changed-in-place";
// @ts-ignore
import * as plumber from "gulp-plumber";
// @ts-ignore
import * as sourcemaps from "gulp-sourcemaps";
// @ts-ignore
import * as notify from "gulp-notify";
// @ts-ignore
import * as rename from "gulp-rename";
// @ts-ignore
import * as ts from "gulp-typescript";
// @ts-ignore
import * as project from "../aurelia.json";
import { CLIOptions, build } from "aurelia-cli";
import * as eventStream from "event-stream";

function configureEnvironment() {
  let env = CLIOptions.getEnvironment();

  return gulp
    .src(`aurelia_project/environments/${env}.ts`)
    .pipe(changedInPlace({ firstPass: true }))
    .pipe(rename("environment.ts"))
    .pipe(gulp.dest(project.paths.root));
}

var typescriptCompiler = typescriptCompiler || null;

function buildTypeScript() {
  typescriptCompiler = ts.createProject("tsconfig.json", {
    typescript: require("typescript")
  });

  let dts = gulp.src(project.transpiler.dtsSource);

  let src = gulp
    .src(project.transpiler.source)
    .pipe(changedInPlace({ firstPass: true }));

  return eventStream
    .merge(dts, src)
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(sourcemaps.init())
    .pipe(typescriptCompiler())
    .pipe(sourcemaps.write({ sourceRoot: "src" }))
    .pipe(build.bundle());
}

export default gulp.series(configureEnvironment, buildTypeScript);

export function transpilePluginCommon() {
  const typescriptCompiler = ts.createProject("tsconfig.json", {
    typescript: require("typescript"),
    allowJs: false,
    declaration: true, // write d.ts files
    module: "commonjs" // note we use commonjs format
  });

  let dts = gulp.src(project.transpiler.dtsSource);
  let src = gulp.src(project.plugin.source.js);

  return (
    eventStream
      .merge(dts, src)
      .pipe(
        plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
      )
      // .pipe(sourcemaps.init())
      .pipe(typescriptCompiler())
      // .pipe(sourcemaps.write({ sourceRoot: 'src' }))
      .pipe(gulp.dest(project.plugin.output + "/commonjs"))
  );
}

export function transpilePluginAMD() {
  const typescriptCompiler = ts.createProject("tsconfig.json", {
    typescript: require("typescript"),
    allowJs: false,
    declaration: true, // write d.ts files
    module: "amd" // note we use commonjs format
  });

  let dts = gulp.src(project.transpiler.dtsSource);
  let src = gulp.src(project.plugin.source.js);

  return (
    eventStream
      .merge(dts, src)
      .pipe(
        plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
      )
      // .pipe(sourcemaps.init())
      .pipe(typescriptCompiler())
      // .pipe(sourcemaps.write({ sourceRoot: 'src' }))
      .pipe(gulp.dest(project.plugin.output + "/amd"))
  );
}

export function transpilePluginES2015() {
  const typescriptCompiler = ts.createProject("tsconfig.json", {
    typescript: require("typescript"),
    allowJs: false,
    declaration: true, // write d.ts files
    module: "es2015" // note we use commonjs format
  });

  let dts = gulp.src(project.transpiler.dtsSource);
  let src = gulp.src(project.plugin.source.js);

  return (
    eventStream
      .merge(dts, src)
      .pipe(
        plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
      )
      // .pipe(sourcemaps.init())
      .pipe(typescriptCompiler())
      // .pipe(sourcemaps.write({ sourceRoot: 'src' }))
      .pipe(gulp.dest(project.plugin.output + "/es2015"))
  );
}

export function transpilePluginSystem() {
  const typescriptCompiler = ts.createProject("tsconfig.json", {
    typescript: require("typescript"),
    allowJs: false,
    declaration: true, // write d.ts files
    module: "system" // note we use commonjs format
  });

  let dts = gulp.src(project.transpiler.dtsSource);
  let src = gulp.src(project.plugin.source.js);

  return (
    eventStream
      .merge(dts, src)
      .pipe(
        plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
      )
      // .pipe(sourcemaps.init())
      .pipe(typescriptCompiler())
      // .pipe(sourcemaps.write({ sourceRoot: 'src' }))
      .pipe(gulp.dest(project.plugin.output + "/system"))
  );
}
