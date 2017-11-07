
import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';



export function configure(config: FrameworkConfiguration) {
  config.globalResources(PLATFORM.moduleName('./elements/star-rate'));
}


export * from './elements/star-rate';
export * from './elements/StarRateClicked';
