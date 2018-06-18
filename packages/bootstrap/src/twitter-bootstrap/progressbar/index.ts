import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './abt-progress';
export * from './abt-progress-bar';



export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./abt-progress'),
    PLATFORM.moduleName('./abt-progress-bar')
  ]);
}
