import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './abt-popover';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./abt-popover')
  ]);
}

