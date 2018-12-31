import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './at-float-label';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([PLATFORM.moduleName('./at-float-label')]);
}
