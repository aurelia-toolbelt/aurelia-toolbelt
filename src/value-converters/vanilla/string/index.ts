import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config
    .feature(PLATFORM.moduleName('aurelia-toolbelt/value-converters/vanilla/string/latin/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/value-converters/vanilla/string/persian/index'))
    // .feature(PLATFORM.moduleName('aurelia-toolbelt/value-converters/vanilla/string/strman/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/value-converters/vanilla/string/numeral/index'))
    ;
}
