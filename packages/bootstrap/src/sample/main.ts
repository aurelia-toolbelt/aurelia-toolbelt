import { Aurelia } from 'aurelia-framework';

import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'bootstrap/dist/css/bootstrap-reboot.css';
import 'bootstrap/dist/css/bootstrap.css';



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
