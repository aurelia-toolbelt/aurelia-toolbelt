import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';
import { IToastrServiceOptions } from './toastr-service-options';

export function configure(config: FrameworkConfiguration, options?: IToastrServiceOptions) {
    config.globalResources([PLATFORM.moduleName('./toastr-service')]);
    config.container.registerInstance('toastr-service-options', options);
}
