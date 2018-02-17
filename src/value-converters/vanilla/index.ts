import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration): void {
  config
    .feature(PLATFORM.moduleName('aurelia-toolbelt/value-converters/vanilla/array/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/value-converters/vanilla/datetime/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/value-converters/vanilla/fusejs/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/value-converters/vanilla/mark-down/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/value-converters/vanilla/string/index'))
    ;
}
