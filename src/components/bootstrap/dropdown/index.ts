import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './abt-dropdown';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./abt-dropdown')
  ]);
}
