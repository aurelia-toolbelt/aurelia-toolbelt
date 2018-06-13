// @ts-check
/**
 * Helper to transpile the code using the fusebox-typechecker
 *
 */
const transpiler = require('fuse-box-typechecker').TypeHelper;
// @ts-ignore
const FOLDER_NAME = require('../package.json').folder_name;

module.exports.transpileTo = function (outDir, moduleType) {
  var transpile = transpiler({
    tsConfig: './tsconfig.json',
    basePath: './',
    tsLint: './tslint.json',
    name: `building:${moduleType}, at: ${outDir}`,
    shortenFilenames: true,
    yellowOnLint: true,
    emit: true,
    clearOnEmit: true,
    tsConfigOverride: {
      compilerOptions: {
        rootDir: `src/${FOLDER_NAME}`,
        outDir: outDir,
        module: moduleType
      },
      paths: {}
    }
  });



  return transpile.runSync();
};