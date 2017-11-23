import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config
    .feature(PLATFORM.moduleName('aurelia-toolbelt/value-converters/string/latin/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/value-converters/string/persian/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/value-converters/string/strman/index'))
    ;
}
