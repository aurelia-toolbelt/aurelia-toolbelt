
import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';



export function configure(config: FrameworkConfiguration) {
  config.globalResources(PLATFORM.moduleName('./aut-star-rate'));
}


export * from './aut-star-rate';
export * from './StarRateClicked';
