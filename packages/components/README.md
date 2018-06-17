
![Imgur](https://i.imgur.com/xVO5NYd.png)

# Aurelia plugin skeleton with Typescript

You need to make an Aurelia Typescript plugin?
If "YES!!!", you have just found the perfect place to start :smile:

Here is the key components of the plugin skeleton:

1. [Typescript](https://www.typescriptlang.org/) as a typed super set of JavaScript that compiles to plain JavaScript.
2. [FuseBox](https://github.com/fuse-box/fuse-box) as a bundler/module loader for the _**sample**_ (incl [fuse-box-aurelia-loader](https://github.com/fuse-box/fuse-box-aurelia-loader))
3. [Jest](https://facebook.github.io/jest/) a delightful JavaScript test framework.
4. [Puppeteer](Puppeteer) as headless Chrome for E2E testing.
5. [FuseBox Type Checker](https://github.com/fuse-box/fuse-box-typechecker) as a simple helper to do type-checking & linting while developing and producing the final build.

### How to build and run sample
  * ```npm run watch```
    * Launches sample and watches src folder
    * it does the type-checking and ts-lints on every save
    * Now open `http://localhost:4444` to see your plugin in action.

  * ```npm run build```
    * Produces amd/commonjs/system/es2015 builds
    * This will *NOT* emit/update files if you have any typescript or tslint errors

### How to rename to your own plugin
  * run:  ```npm run setup```
    * Answer the question about name and version.

### How to run unit tests

  * To run the unit test with _*Jest*_ run : _```npm run test:unit```_
    * Watch mode: _```npm run test:unit -- --watch```_
    * See the coverage: _```npm run test:unit -- --coverage```_

### How to run E2E tests

  * Simply run: _```npm run test:e2e```_
    * Make sure you've run the sample prior to the e2e test by running the _`npm watch`_ command.

### Before you start coding(or publishing an npm package) you also need to check the followings:

  *  delete .git folder and run `git init`
  * update package.json with
    * description
    * keywords
    * homepage
    * bugs
    * license
    * author
    * repository
    * etc etc
