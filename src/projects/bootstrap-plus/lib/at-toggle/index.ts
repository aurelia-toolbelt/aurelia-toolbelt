import { FrameworkConfiguration } from 'aurelia-framework';
import { AtToggle } from './at-toggle';


export function configure(config: FrameworkConfiguration) {
  // use static class for all resources.
  // need to use decorators on all definitions
  // check https://github.com/aurelia/templating/blob/master/src/decorators.js
  config.globalResources([
    AtToggle
  ]);
}
