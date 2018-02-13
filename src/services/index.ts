import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';



export function configure(config: FrameworkConfiguration) {
  config
    .feature(PLATFORM.moduleName('aurelia-toolbelt/services/bootstrap/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/services/jquery/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/services/misc/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/services/vanilla/index'))
    ;

}
