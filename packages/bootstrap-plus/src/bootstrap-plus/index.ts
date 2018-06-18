import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config
    .feature(PLATFORM.moduleName('@aurelia-toolbelt/core/bootstrap/password/index'))
    .feature(PLATFORM.moduleName('@aurelia-toolbelt/core/bootstrap/star-rate/index'))
    .feature(PLATFORM.moduleName('@aurelia-toolbelt/core/bootstrap/toggle/index'))
    .feature(PLATFORM.moduleName('@aurelia-toolbelt/core/bootstrap/float-input/index'))
    .feature(PLATFORM.moduleName('@aurelia-toolbelt/core/bootstrap/tokenize/index'));

}
