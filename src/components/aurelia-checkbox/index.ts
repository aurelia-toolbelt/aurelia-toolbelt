
import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';


export * from './pretty-checkbox';

export function configure(config: FrameworkConfiguration) {
  config.globalResources(PLATFORM.moduleName('./pretty-checkbox'));
}
