import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration): void {
  config
    .feature(PLATFORM.moduleName('@aurelia-toolbelt/core/value-converters/array/index'))
    .feature(PLATFORM.moduleName('@aurelia-toolbelt/core/value-converters/datetime/index'))
    .feature(PLATFORM.moduleName('@aurelia-toolbelt/core/value-converters/fusejs/index'))
    .feature(PLATFORM.moduleName('@aurelia-toolbelt/core/value-converters/mark-down/index'))
    .feature(PLATFORM.moduleName('@aurelia-toolbelt/core/value-converters/string/index'))
    ;
}
