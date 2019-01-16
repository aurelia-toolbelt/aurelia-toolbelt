import 'aurelia-polyfills';
import {Options} from 'aurelia-loader-nodejs';
import {globalize} from 'aurelia-pal-nodejs';
import * as path from 'path';

/* 
  Un-comment the following lines 
  if you have not set the globals 
  in your package.json file for jest : 

  "jest": {
    "globals": {
      "navigator": {
        "userAgent": "node.js"
      }
    },
  }
*/
// // @ts-ignore
// global.navigator = {
//   userAgent: 'node.js'
// };

Options.relativeToDir = path.join(__dirname, 'unit');
globalize();
