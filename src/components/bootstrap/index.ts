import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/bootstrap/alert/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/bootstrap/badge/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/bootstrap/breadcrumb/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/bootstrap/button/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/bootstrap/card/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/bootstrap/collapse/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/bootstrap/dropdown/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/bootstrap/inputgroup/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/bootstrap/modal/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/bootstrap/navbar/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/bootstrap/navs/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/bootstrap/password/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/bootstrap/pagination/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/bootstrap/progressbar/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/bootstrap/scrollspy/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/bootstrap/star-rate/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/bootstrap/toggle/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/bootstrap/float-input/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/bootstrap/jumbotron/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/bootstrap/tokenize/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/bootstrap/tooltip/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/bootstrap/popover/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/bootstrap/carousel/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/bootstrap/listgroup/index'))

    ;

}
