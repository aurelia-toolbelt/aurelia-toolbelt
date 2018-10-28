
import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './at-news';

export function configure(config: FrameworkConfiguration) {

  config.aurelia.use.plugin(PLATFORM.moduleName('aurelia-animator-css'));

  config.globalResources(PLATFORM.moduleName('./at-news'));

}
