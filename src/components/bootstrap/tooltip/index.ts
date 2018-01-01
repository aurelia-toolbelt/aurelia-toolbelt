import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './abt-tooltip';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./abt-tooltip')
  ]);
}

