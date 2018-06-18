import { Aurelia } from 'aurelia-framework';

export async function configure(aurelia: Aurelia) {

  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('@aurelia-toolbelt/core')
    .plugin('@aurelia-toolbelt/bootstrap');


  // setTimeout(async () => {
  await aurelia.start();
  await aurelia.setRoot('app');
  // }, 5000);

}
