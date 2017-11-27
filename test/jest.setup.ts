// TypeError: Reflect.defineMetadata is not a function
import 'aurelia-polyfills'; // Must be exist and First import :D
import { Options } from 'aurelia-loader-nodejs';
import { globalize } from 'aurelia-pal-nodejs';
import * as path from 'path';
Options.relativeToDir = path.join(__dirname, '');
globalize();
