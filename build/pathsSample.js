var appRoot = './sample/src/';
var outputRoot = './sample/dist/';
var plugin = "./dev/"
var fs = require('fs');
var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));


module.exports = {
  root: appRoot,
  source: appRoot + '**/*.ts',
  html: appRoot + '**/*.html',
  css: appRoot + '**/*.css',
  json: appRoot + '**/*.json',
  woff2: appRoot + '**/*.woff2',
  plugin:plugin,
  output: outputRoot,
  doc:'./doc',
  dtsSrc: [
    './sample/typings/**/*.d.ts',
    './sample/custom_typings/**/*.d.ts'
  ],
  packageName: pkg.name
};
