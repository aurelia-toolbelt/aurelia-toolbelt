import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './at-max-length';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([PLATFORM.moduleName('./at-max-length')]);
}
