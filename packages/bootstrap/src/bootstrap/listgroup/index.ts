import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './abt-listgroup';
export * from './abt-listgroup-item';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([PLATFORM.moduleName('./abt-listgroup')]);
  config.globalResources([PLATFORM.moduleName('./abt-listgroup-item')]);
}
