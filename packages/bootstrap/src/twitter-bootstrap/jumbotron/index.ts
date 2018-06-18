import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';


export * from './abt-jumbotron';

export function configure(config: FrameworkConfiguration) {

  config.globalResources(PLATFORM.moduleName('./abt-jumbotron'));
}
