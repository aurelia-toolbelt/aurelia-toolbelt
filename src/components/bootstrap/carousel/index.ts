import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './abt-carousel';
export * from './abt-carousel-image';
export * from './abt-carousel-html';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([PLATFORM.moduleName('./abt-carousel')]);
  config.globalResources([PLATFORM.moduleName('./abt-carousel-image')]);
  config.globalResources([PLATFORM.moduleName('./abt-carousel-html')]);
}
