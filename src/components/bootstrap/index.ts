import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/bootstrap/badge/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/bootstrap/breadcrumb/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/bootstrap/button/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/bootstrap/card/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/bootstrap/dropdown/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/bootstrap/navs/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/bootstrap/password/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/bootstrap/progressbar/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/bootstrap/toggle/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/bootstrap/float-input/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/bootstrap/tokenize/index'))
    ;
}
