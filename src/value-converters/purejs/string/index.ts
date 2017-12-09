import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config
    .feature(PLATFORM.moduleName('aurelia-toolbelt/value-converters/purejs/string/latin/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/value-converters/purejs/string/persian/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/value-converters/purejs/string/strman/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/value-converters/purejs/string/numeral/index'))
    ;
}
