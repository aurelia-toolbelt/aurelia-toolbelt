import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';
import { IToastrServiceOptions } from './toastr-service-options';



export * from './toastr-service-options';
export * from './toastr-service';

export function configure(config: FrameworkConfiguration, options?: IToastrServiceOptions) {

  console.log(config);
  console.log(options);
  // config.globalResources([PLATFORM.moduleName('./toastr-service')]);
  // config.container.registerInstance('toastr-service-options', options);

}
