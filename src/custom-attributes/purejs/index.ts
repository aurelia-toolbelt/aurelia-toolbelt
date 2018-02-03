import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';



export function configure(config: FrameworkConfiguration) {
  config
    .feature(PLATFORM.moduleName('aurelia-toolbelt/custom-attributes/purejs/masked/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/custom-attributes/purejs/uuid/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/custom-attributes/purejs/id/index'))
    ;
}
