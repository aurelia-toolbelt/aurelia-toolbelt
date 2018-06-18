import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';


export * from './abt-alert';
export * from './abt-alert-heading';
export * from './abt-alert-link';

export function configure(config: FrameworkConfiguration) {

  config.globalResources([
    PLATFORM.moduleName('./abt-alert')
    , PLATFORM.moduleName('./abt-alert-heading')
    , PLATFORM.moduleName('./abt-alert-link')
  ]);
}
