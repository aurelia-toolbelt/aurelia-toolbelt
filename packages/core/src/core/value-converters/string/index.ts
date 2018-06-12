import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config
    .feature(PLATFORM.moduleName('@aurelia-toolbelt/core/value-converters/string/latin/index'))
    .feature(PLATFORM.moduleName('@aurelia-toolbelt/core/value-converters/string/numeral/index'))
    ;
}
