import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './abt-carousel';
export * from './abt-carousel-item';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([PLATFORM.moduleName('./abt-carousel')]);
  config.globalResources([PLATFORM.moduleName('./abt-carousel-item')]);
}
