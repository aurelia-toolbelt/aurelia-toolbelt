
// import { Controller } from 'aurelia-templating';
// import { TaskQueue } from 'aurelia-task-queue';
import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './services/bootstrap/bootstrap-typography-service';

export * from './services/jquery/toastr/toastr-service-options';
export * from './services/jquery/toastr/toastr-service';

export * from './services/misc/common-css-service';

export function configure(config: FrameworkConfiguration) {

  config
    .feature(PLATFORM.moduleName('aurelia-toolbelt/binding-behaviours/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/custom-attributes/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/services/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/utilities/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/value-converters/index'))
    ;
}
