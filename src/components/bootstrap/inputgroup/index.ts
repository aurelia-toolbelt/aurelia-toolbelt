import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './abt-inputgroup';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./abt-inputgroup')
  ]);
}

