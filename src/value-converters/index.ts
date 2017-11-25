import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration): void {
  config
    .feature(PLATFORM.moduleName('aurelia-toolbelt/value-converters/array/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/value-converters/datetime/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/value-converters/fusejs/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/value-converters/string/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/value-converters/mark-down/index'))
    ;
}
