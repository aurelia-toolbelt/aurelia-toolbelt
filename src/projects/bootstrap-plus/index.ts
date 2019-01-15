import { FrameworkConfiguration } from 'aurelia-framework';
import { configure as toggleConfigure } from './src/at-toggle/index';

export function configure(config: FrameworkConfiguration) {
  toggleConfigure(config);
}
