import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config
    .feature(PLATFORM.moduleName('@aurelia-toolbelt/bootstrap/alert/index'))
    .feature(PLATFORM.moduleName('@aurelia-toolbelt/bootstrap/badge/index'))
    .feature(PLATFORM.moduleName('@aurelia-toolbelt/bootstrap/breadcrumb/index'))
    .feature(PLATFORM.moduleName('@aurelia-toolbelt/bootstrap/button/index'))
    .feature(PLATFORM.moduleName('@aurelia-toolbelt/bootstrap/card/index'))
    .feature(PLATFORM.moduleName('@aurelia-toolbelt/bootstrap/collapse/index'))
    .feature(PLATFORM.moduleName('@aurelia-toolbelt/bootstrap/dropdown/index'))
    .feature(PLATFORM.moduleName('@aurelia-toolbelt/bootstrap/inputgroup/index'))
    .feature(PLATFORM.moduleName('@aurelia-toolbelt/bootstrap/modal/index'))
    .feature(PLATFORM.moduleName('@aurelia-toolbelt/bootstrap/navbar/index'))
    .feature(PLATFORM.moduleName('@aurelia-toolbelt/bootstrap/navs/index'))
    .feature(PLATFORM.moduleName('@aurelia-toolbelt/bootstrap/pagination/index'))
    .feature(PLATFORM.moduleName('@aurelia-toolbelt/bootstrap/progressbar/index'))
    .feature(PLATFORM.moduleName('@aurelia-toolbelt/bootstrap/scrollspy/index'))
    .feature(PLATFORM.moduleName('@aurelia-toolbelt/bootstrap/jumbotron/index'))
    .feature(PLATFORM.moduleName('@aurelia-toolbelt/bootstrap/tooltip/index'))
    .feature(PLATFORM.moduleName('@aurelia-toolbelt/bootstrap/popover/index'))
    .feature(PLATFORM.moduleName('@aurelia-toolbelt/bootstrap/carousel/index'))
    .feature(PLATFORM.moduleName('@aurelia-toolbelt/bootstrap/listgroup/index'));

}
