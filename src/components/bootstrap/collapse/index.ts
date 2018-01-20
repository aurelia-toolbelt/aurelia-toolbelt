
import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './abt-collapse';

export function configure(config: FrameworkConfiguration) {

  config.globalResources([
    PLATFORM.moduleName('./abt-collapse'),
    PLATFORM.moduleName('./abt-accordion'),
    PLATFORM.moduleName('./abt-accordion-item')
  ]);

}
