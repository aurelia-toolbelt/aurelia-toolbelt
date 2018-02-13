import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';



export function configure(config: FrameworkConfiguration) {
  config
    .feature(PLATFORM.moduleName('aurelia-toolbelt/custom-attributes/vanilla/masked/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/custom-attributes/vanilla/uuid/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/custom-attributes/vanilla/id/index'))
    ;
}
