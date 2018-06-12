import { Aurelia } from 'aurelia-framework';

export async function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('core');

  await aurelia.start();
  await aurelia.setRoot('sample/app');
}
