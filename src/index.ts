
import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';


export function configure(config: FrameworkConfiguration) {

  config
    .feature(PLATFORM.moduleName('aurelia-toolbelt/binding-behaviours/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/custom-attributes/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/services/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/utilities/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/value-converters/index'))
    ;
  config.plugin(PLATFORM.moduleName('aurelia-after-attached-plugin'));
}
