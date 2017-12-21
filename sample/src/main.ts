import { IToastrServiceOptions } from './../../src/services/jquery/toastr/toastr-service-options';
import { Aurelia } from 'aurelia-framework';

export async function configure(aurelia: Aurelia) {

  let option: IToastrServiceOptions = {
    closeButton: true
  };

  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-toolbelt')

    ;

  await aurelia.start();
  await aurelia.setRoot('app');
}
