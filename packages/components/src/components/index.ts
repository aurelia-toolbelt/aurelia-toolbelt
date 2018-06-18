import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';




export function configure(config: FrameworkConfiguration) {

  config
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/vanilla/clock/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/vanilla/mark-down/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/vanilla/nprogress/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/vanilla/pretty/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/vanilla/microlink/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/vanilla/scrollup/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/vanilla/raw-html/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/vanilla/divider/index'));

}
