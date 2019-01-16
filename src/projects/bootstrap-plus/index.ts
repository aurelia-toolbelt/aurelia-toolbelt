import { FrameworkConfiguration } from 'aurelia-framework';
import { configure as toggleConfigure } from './lib/at-toggle/index';

export function configure(config: FrameworkConfiguration) {
  toggleConfigure(config);
}
