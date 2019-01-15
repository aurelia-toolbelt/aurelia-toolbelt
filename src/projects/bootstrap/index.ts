import { FrameworkConfiguration } from 'aurelia-framework';
import { configure as alertConfigure } from './src/alert/index';
import { configure as buttonConfigure } from './src/button/index';

export function configure(config: FrameworkConfiguration) {
  alertConfigure(config);
  buttonConfigure(config);
}
