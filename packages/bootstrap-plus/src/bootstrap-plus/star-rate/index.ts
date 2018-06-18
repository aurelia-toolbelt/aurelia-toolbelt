
import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';



export function configure(config: FrameworkConfiguration) {
  config.globalResources(PLATFORM.moduleName('./abt-star-rate'));
}


export * from './abt-star-rate';
