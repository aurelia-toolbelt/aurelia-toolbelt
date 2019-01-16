import { FrameworkConfiguration } from 'aurelia-framework';
import { configure as alertConfigure } from './lib/alert/index';
import { configure as buttonConfigure } from './lib/button/index';

export function configure(config: FrameworkConfiguration) {
  alertConfigure(config);
  buttonConfigure(config);
}
