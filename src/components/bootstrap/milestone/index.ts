import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './at-milestone';
export * from './at-milestone-container';


export function configure(config: FrameworkConfiguration) {

  config.globalResources([
    PLATFORM.moduleName('./at-milestone-container'),
    PLATFORM.moduleName('./at-milestone')
  ]);
}
