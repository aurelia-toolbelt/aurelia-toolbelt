import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';


export * from './breadcrumb-item';
export * from './abt-breadcrumb';


export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./abt-breadcrumb')
  ]);
}

