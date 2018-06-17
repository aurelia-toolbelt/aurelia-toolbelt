import { Aurelia } from 'aurelia-framework';

export async function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('@aurelia-toolbelt/bootstrap-plus')
    .plugin('@aurelia-toolbelt/core' )
    ;

  await aurelia.start();
  await aurelia.setRoot('app');
}
