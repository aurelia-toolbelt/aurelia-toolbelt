import { IToastrServiceOptions } from './../../src/services/jquery/toastr/toastr-service-options';
import { Aurelia } from 'aurelia-framework';

export async function configure(aurelia: Aurelia) {

  let option: IToastrServiceOptions = {
    closeButton: true
  };

  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    // .plugin('aurelia-dialog')
    .plugin('aurelia-toolbelt')
    .plugin('aurelia-toolbelt/services/jquery/toastr', {
      progressBar: false, preventDuplicates: true, positionClass: 'toast-bottom-left'
    });


  // setTimeout(async () => {
  await aurelia.start();
  await aurelia.setRoot('app');
  // }, 5000);

}
