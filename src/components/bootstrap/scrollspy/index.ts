import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';


export * from './abt-scrollspy';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([PLATFORM.moduleName('./abt-scrollspy')]);
}
