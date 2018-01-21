import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';


export * from './abt-scrollspy';
export * from './abt-scrollspy-item';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./abt-scrollspy'),
    PLATFORM.moduleName('./abt-scrollspy-item')
  ]);
}
