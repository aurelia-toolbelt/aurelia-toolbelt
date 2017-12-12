import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';


export * from './abt-button';
export * from './abt-toolbar';
export * from './abt-button-group';
export * from './abt-link-button';

export function configure(config: FrameworkConfiguration) {

  config.globalResources([
    PLATFORM.moduleName('./abt-button')
    , PLATFORM.moduleName('./abt-toolbar')
    , PLATFORM.moduleName('./abt-button-group')
    , PLATFORM.moduleName('./abt-link-button')
  ]);

}
