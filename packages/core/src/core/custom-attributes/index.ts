import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';



export function configure(config: FrameworkConfiguration) {
  config
    .feature(PLATFORM.moduleName('aurelia-toolbelt/custom-attributes/id/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/custom-attributes/masked/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/custom-attributes/uuid/index'))
    ;

}
