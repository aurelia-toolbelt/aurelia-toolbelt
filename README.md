All credit goes to [@huochunpeng](https://github.com/huochunpeng)
---



# How to use aurelia-cli to develop Aurelia plugin

> This guide has been updated to match aurelia-cli version 1.0.0-beta.2 (or above).

The current way [skeleton-plugin](https://github.com/aurelia/skeleton-plugin) to develop Aurelia plugin bothered me.

1. need to maintain jspm config.
2. testing is hard, requires many mocks on quite a few Aurelia internal objects which I am not familiar with.
3. dev flow is not smooth, need to use `npm link` in another dev app in order to try my plugin.

We love using `au run` and `au test` in app dev, if only there is a way to use cli to develop plugin...

Well, here is how to.

## cli is already capable for developing plugin

This might surprise you, but cli is all ready for the job.

What you need is a small adjustment of your mindset:

### Your `src/` folder, is not necessary the source folder. Imagining `src/` is just the dev env, the real source folder is `src/resources` (or `src/plugin-name`).

See the light? `src/resources/index.js` defines a `configure` function, exactly like the entry file of a plugin.

Here is a flow I have been using on our private plugins since August 2017. It's based on `cli+requirejs` setup, plus small adding in task files.

### 1. update tasks

`cli+requirejs` already did most job for us, it provided tasks `transpile`, `process-css` and `process-markup` for js/css/html files. By default, task `build` writes bundles to `scripts/`.

What we want to do here is to extend the 3 tasks. Instead of pipe to cli bundler, we pipe to folder `dist/` directly.

#### first, (optional) write source and output folder into `aurelia.json`.

```js
{
  // add plugin section
  "plugin": {
    "source": {
      "js": "src/resources/**/*.js", // this will be different if you use TypeScript
      "html": "src/resources/**/*.html",
      "css": "src/resources/**/*.css" // this will be different if you use scss/less
    },
    "output": "dist"
  }
}
```

#### append following to `aurelia_project/tasks/transpile.js` task file

Note, different from skeleton-plugin setup which transpiles into multiple formats (`dist/amd`, `dist/commonjs`, ...), our setup transpiles directly to `dist/` in just `commonjs` format.

> webpack/jspm/cli+requirejs all can handle `commonjs` format. Other formats are unnecessary.

For ESNext project:
```js
// build plugin js files
// this will be slightly different if you use TypeScript
export function transpilePlugin() {
  return gulp.src(project.plugin.source.js)
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    // .pipe(sourcemaps.init())
    .pipe(babel({
      plugins: [['@babel/plugin-transform-modules-commonjs', {loose: true}]] // note we use commonjs format
    }))
    // .pipe(gulpUglify())
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest(project.plugin.output));
}
```

For TypeScript project
```ts
export function transpilePlugin() {
  const typescriptCompiler = ts.createProject('tsconfig.json', {
    typescript: require('typescript'),
    allowJs: false, declaration: true // write d.ts files
    'module': 'commonjs' // note we use commonjs format
  });

  let dts = gulp.src(project.transpiler.dtsSource);
  let src = gulp.src(project.plugin.source.js);

  return eventStream.merge(dts, src)
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    // .pipe(sourcemaps.init())
    .pipe(typescriptCompiler())
    // .pipe(sourcemaps.write({ sourceRoot: 'src' }))
    .pipe(gulp.dest(project.plugin.output));
}
```

#### append following to `aurelia_project/tasks/process-css.js` task file

```js
// build plugin css files
// you need bit more than this if you use scss
export function pluginCSS() {
  return gulp.src(project.plugin.source.css)
    .pipe(gulp.dest(project.plugin.output));
}
```

#### append following to `aurelia_project/tasks/process-markup.js` task file

```js
// build plugin html files
// you need bit more than this if you use htmlmin
export function pluginMarkup() {
  return gulp.src(project.plugin.source.html)
    .pipe(gulp.dest(project.plugin.output));
}
```

### 2. create task `build-plugin`

First, use `del` (`npm i --save-dev del`) to clean up `dist/` folder everytime we build.

Create new file `aurelia_project/tasks/build-plugin.js`

```js
import gulp from 'gulp';
import {pluginMarkup} from './process-markup';
import {pluginCSS} from './process-css';
import {transpilePlugin} from './transpile';
import del from 'del';
import project from '../aurelia.json';

function clean() {
  return del(project.plugin.output);
}

export default gulp.series(
  clean,
  gulp.parallel(
    pluginMarkup,
    pluginCSS,
    transpilePlugin
  ),
);
```

With these little code, we already got `au build-plugin` to do what we want!

In addition, there are few housekeeping things.

### 3. (recommended) ignore `/scripts` and `/dist` in `.gitignore`

If you want your repo to be both the source repo and github pages repo, you should commit `/scripts` files instead of ignoring it. Why not, all your `src/` files can be both dev playground and live doc.

> Remember to [turn on `rev: "prod"`](http://aurelia.io/docs/cli/bundler#build-revisions) (to avoid cache issue on github pages site) in `aurelia.json` and `au build --env prod` when release new github pages.

For `/dist`, I will explain in `npm publish` shortly.

### 4. important! in `package.json`, move all `dependencies` to `devDependencies`, then craft `dependencies` or `peerDependencies` carefully

Remember we are using cli as dev tool, your product (the plugin) does not depend on `aurelia-bootstrapper`, `aurelia-animator-css`, `requirejs`, etc.

Now carefully exam all your plugin files in `src/resources` folder, put the real dependencies into either `dependencies` or `peerDependencies`.

> I recommend using `peerDependencies` for core aurelia libs. Because for your plugin users, they likely already got all the Aurelia libs. Only use `dependencies` for additional dependencies like `lodash` or `jquery`.

> Write dependency as permissive as possible, use `"aurelia-binding": "^2.0.0"`, not `"aurelia-binding": "^2.1.5"`.

### 5. important! control distributed npm package content

I recommend to add following to `package.json`.

```js
{
  // ...
  "main": "dist/index.js",
  "files": [ "dist" ],
  // ...
}
```

This only publish the `dist/` files, not `src/` or `test/` files.

The `"files"` is a white-list. Alternatively, you can use [`.npmignore` to define a black-list](https://docs.npmjs.com/misc/developers#keeping-files-out-of-your-package).

### 6. (recommended) npm scripts to support publishing

For instance, for bare minimum, you can add following to `package.json`.

```js
{
  // ...
  "scripts": {
    "test": "au test",
    "preversion": "npm test",
    "version": "standard-changelog && git add CHANGELOG.md", // if you want to use npm i --save-dev standard-changelog
    "prepare": "au build-plugin",
    "postversion": "git push && git push --tags && npm publish" // auto publish after npm version patch/minor/major
  }
}
```

The above scripts are designed to auto publish npm package, after you run `npm version patch` (or `minor`/`major`).

If your plugin is not public, you can remove `&& npm publish` from `"postversion"` line.

> Remember I recommended ignoring `dist/` files in `.gitignore`. For private plugin, if you install from git repo directly, `npm` will use `npm prepare` to prepare the package (build all `dist/` files).

> Currently, `yarn` has bug that [bypasses `npm prepare` when installing github hosted repo](https://github.com/yarnpkg/yarn/issues/5235). So if you want to npm install private github repo, don't use yarn, or don't ignore `dist/` files.

## That's it!

Now you can enjoy `au run` and `au test` to build your plugin just like building a normal app. The best part for me, is now I can test my plugin using `aurelia-testing` instead of scratching my head on how to mock up Aurelia internals.

Want an example?
* esnext [`bcx-aurelia-reorderable-repeat`](https://github.com/buttonwoodcx/bcx-aurelia-reorderable-repeat)
* TypeScript [`demo-plugin-cli-ts`](https://github.com/huochunpeng/demo-plugin-cli-ts)
