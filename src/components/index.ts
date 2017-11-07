import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';




export function configure(config: FrameworkConfiguration) {

  config
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/hello-world/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/bootstrap/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/aurelia-star-rate/index'))
    ;

}
