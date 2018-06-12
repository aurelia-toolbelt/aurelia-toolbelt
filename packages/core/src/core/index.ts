
import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';


export * from './utilities/jsTools';
export * from './utilities/sharedIndex';
export * from './utilities/uuid';

export function configure(config: FrameworkConfiguration) {

  config
    .feature(PLATFORM.moduleName('@aurelia-toolbelt/core/custom-attributes/index'))
    .feature(PLATFORM.moduleName('@aurelia-toolbelt/core/utilities/index'))
    .feature(PLATFORM.moduleName('@aurelia-toolbelt/core/value-converters/index'))
    ;
}
