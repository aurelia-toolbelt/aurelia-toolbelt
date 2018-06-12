import { Aurelia } from 'aurelia-framework';

import * as fuse from 'fuse.js';
let f = fuse;

const hl = require('highlight.js');
let hljs = hl;

export async function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('@aurelia-toolbelt/core');

  await aurelia.start();
  await aurelia.setRoot('app');
}
