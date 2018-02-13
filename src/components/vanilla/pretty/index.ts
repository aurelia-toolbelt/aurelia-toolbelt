
import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';


export * from './aut-checkbox';
export * from './aut-radio';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./aut-checkbox'),
    PLATFORM.moduleName('./aut-radio')
  ]);
}
