import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration, options: any) {
  config
    .feature(PLATFORM.moduleName('aurelia-toolbelt/services/jquery/toastr/index'), options);
}
