import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './abt-modal';
export * from './abt-modal-title';
export * from './abt-modal-header';
export * from './abt-modal-body';
export * from './abt-modal-footer';


export function configure(config: FrameworkConfiguration) {

  config.globalResources([
    PLATFORM.moduleName('./abt-modal'),
    PLATFORM.moduleName('./abt-modal-header'),
    PLATFORM.moduleName('./abt-modal-title'),
    PLATFORM.moduleName('./abt-modal-body'),
    PLATFORM.moduleName('./abt-modal-footer')
  ]);

}
