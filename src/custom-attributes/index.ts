import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';



export function configure(config: FrameworkConfiguration) {
  config
    .feature(PLATFORM.moduleName('aurelia-toolbelt/custom-attributes/bootstrap/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/custom-attributes/jquery/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/custom-attributes/vanilla/index'))
    ;

}
