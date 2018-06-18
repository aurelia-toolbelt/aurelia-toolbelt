import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './abt-float-input';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([PLATFORM.moduleName('./abt-float-input')]);
}
