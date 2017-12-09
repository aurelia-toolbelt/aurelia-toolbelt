import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/bootstrap/password/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/bootstrap/toggle/index'))
    ;
}
