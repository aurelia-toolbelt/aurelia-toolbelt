import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration): void {
  config
    .feature(PLATFORM.moduleName('aurelia-toolbelt/value-converters/purejs/array/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/value-converters/purejs/datetime/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/value-converters/purejs/fusejs/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/value-converters/purejs/mark-down/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/value-converters/purejs/string/index'))
    ;
}
