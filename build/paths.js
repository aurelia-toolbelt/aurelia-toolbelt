var appRoot = 'src/';
var outputRoot = 'dist/';
var outputDev = './dev';

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.ts',
  html: appRoot + '**/*.html',
  css: appRoot + '**/*.css',
  json: appRoot + '**/*.json',
  woff2: appRoot + '**/*.woff2',
  output: outputRoot,
  outputDev: outputDev,
  doc:'./doc',
  dtsSrc: [
    './typings/**/*.d.ts',
    './custom_typings/**/*.d.ts'
  ]
};
