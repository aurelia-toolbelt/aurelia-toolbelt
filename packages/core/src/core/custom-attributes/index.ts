import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';


import {log} from '../log';

export function configure(config: FrameworkConfiguration) {

  log.info('Configure of custom-attributes');

  config
    .feature(PLATFORM.moduleName('@aurelia-toolbelt/core/custom-attributes/id/index'))
    .feature(PLATFORM.moduleName('@aurelia-toolbelt/core/custom-attributes/masked/index'))
    .feature(PLATFORM.moduleName('@aurelia-toolbelt/core/custom-attributes/uuid/index'))
    ;

}
