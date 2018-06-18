
import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';


export * from './aut-raw-html';
export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./aut-raw-html')
  ]);
}
