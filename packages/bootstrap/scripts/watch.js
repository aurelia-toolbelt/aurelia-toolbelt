// @ts-check
/**
 * This takes care of the watch script, uses fusebox as loader/bundler
 *
 */
const {
  FuseBox,
  QuantumPlugin,
  WebIndexPlugin,
  Sparky,
  HTMLPlugin,
  CSSPlugin,
  RawPlugin
} = require('fuse-box');
// @ts-ignore
const FOLDER_NAME = require('../package.json').folder_name;
// @ts-ignore
const PACKAGE_NAME = require('../package.json').name;
const {
  runTypeChecker
} = require('./typechecker');
const {
  bootstrapLoader
} = require('./bootstrapLoader');
let fuse_sample, fuse_plugin, target = 'browser@es6';


// add your vendor packages in here
let instructions = `
    > extra.ts
    + fuse-box-css
    + aurelia-bootstrapper
    + aurelia-binding
    + aurelia-framework
    + aurelia-pal
    + aurelia-metadata
    + aurelia-loader-default
    + aurelia-polyfills
    + aurelia-fetch-client
    + aurelia-pal-browser
    + aurelia-animator-css
    + aurelia-logging-console
    + aurelia-templating-binding
    + aurelia-templating-resources
    + aurelia-event-aggregator
    + aurelia-history-browser
    + aurelia-templating-router
    + fuse-box-aurelia-loader
    `;

let webIndexTemplate =
  `<!DOCTYPE html>
    <html>
        <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Welcome to Aurelia with FuseBox</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
        <script src="https://code.jquery.com/jquery-3.1.1.slim.min.js" integrity="sha384-A7FZj7v+d/sdmMqp/nOQwliLvUsJfDHW+k9Omg/a/EheAdgtzNs3hpfag6Ed950n" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>
    </head>
    <body aurelia-app="main"></body>
    <script type="text/javascript" charset="utf-8" src="./vendor.js"></script>
    <script type="text/javascript" charset="utf-8" src="./app.js"></script>
    <script type="text/javascript" charset="utf-8" src="./${FOLDER_NAME}.js"></script>
    </html>`;


Sparky.task('config', () => {


  fuse_sample = FuseBox.init({
    homeDir: '../src/sample',
    globals: {
      'default': '*'
    },
    target: target,
    output: '../dev/$name.js',
    cache: false,
    log: false,
    debug: false,
    alias: {
      [FOLDER_NAME]: `~/${FOLDER_NAME}`
    },
    // Need to be the same..(alias cant be anything since its really on transpile fusebox does this)
    plugins: [
      bootstrapLoader(),
      CSSPlugin(),
      HTMLPlugin(),
      RawPlugin(['.css', '.woff']),
      WebIndexPlugin({
        templateString: webIndexTemplate
      })
    ]
  });

  fuse_sample.bundle(`vendor`)
    .cache(false)
    // .shim({
    //   jquery: {
    //     source: "node_modules/jquery/dist/jquery.js",
    //     exports: "$"
    //   }
    // })
    .instructions(instructions);


  fuse_sample.bundle('app')
    .instructions(`
        > [main.ts]
        + [**/*.{ts,html,css}]
    `)
    .sourceMaps(true)
    .watch()
    .completed(proc => {
      runTypeChecker();
    });


  fuse_plugin = FuseBox.init({
    homeDir: `../src/${FOLDER_NAME}`,
    // globals: {
    //   '@aut/shahab': '*'
    // },
    target: target,
    output: '../dev/$name.js',
    cache: false,
    log: false,
    alias: {
      [FOLDER_NAME]: `~/${FOLDER_NAME}`
    },
    // Need to be the same..(alias cant be anything since its really on transpile fusebox does this)
    plugins: [
      bootstrapLoader(),
      CSSPlugin(),
      HTMLPlugin()
    ],
    package: {
      name: `${PACKAGE_NAME}`,
      main: "index.ts" // if your package start point file is different change it here
    }
  });

  // the name of the output file as specified $name in output part of init method 
  fuse_plugin.bundle(`${FOLDER_NAME}`)
    .watch().cache(false)
    .instructions(`
            + [**/*.html]
            + [**/*.ts]
            + [**/*.js]
            + [**/*.css]
        `).sourceMaps(true);

});


Sparky.task('clean', () => {
  return Sparky.src('../dev/').clean('../dev/');
});


Sparky.task('default', ['clean', 'config'], () => {

  fuse_plugin.run();

  fuse_sample.dev();
  fuse_sample.run();
});