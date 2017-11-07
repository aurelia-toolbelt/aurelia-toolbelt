import { Aurelia } from 'aurelia-framework';

export async function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-skeleton-plugin-typescript');

  await aurelia.start();
  await aurelia.setRoot('app');
}
