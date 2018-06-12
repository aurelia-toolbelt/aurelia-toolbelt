
import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {

  config
    .feature(PLATFORM.moduleName('aurelia-toolbelt/core/custom-attributes/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/core/utilities/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/core/value-converters/index'))
    ;
}
