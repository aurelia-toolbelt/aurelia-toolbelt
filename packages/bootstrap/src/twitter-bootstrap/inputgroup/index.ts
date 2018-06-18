import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './abt-inputgroup';
export * from './abt-inputgroup-append';
export * from './abt-inputgroup-prepend';
export * from './abt-inputgroup-text';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./abt-inputgroup'),
    PLATFORM.moduleName('./abt-inputgroup-append'),
    PLATFORM.moduleName('./abt-inputgroup-prepend'),
    PLATFORM.moduleName('./abt-inputgroup-text')
  ]);
}

