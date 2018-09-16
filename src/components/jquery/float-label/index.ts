import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './aut-float-label';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([PLATFORM.moduleName('./aut-float-label')]);
}
