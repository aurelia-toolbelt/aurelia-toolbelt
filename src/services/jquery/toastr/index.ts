import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';
import { IToastrServiceOptions } from './toastr-service-options';
import { ToastrService } from './toastr-service';

import * as toastr from 'toastr';


export function configure(config: FrameworkConfiguration, toastrOption: ToastrOptions) {

  let trs: ToastrService = new ToastrService(toastr);

  if (toastrOption) {
    config.container.registerSingleton(ToastrService, () => {

      toastr.options.progressBar = toastrOption.progressBar;
      toastr.options.preventDuplicates = toastrOption.preventDuplicates;
      toastr.options.positionClass = toastrOption.positionClass;

      return trs;

    });
  }

}
