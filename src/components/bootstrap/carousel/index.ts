import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './abt-carousel';
export * from './abt-carousel-image-item';
export * from './abt-carousel-html-item';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([PLATFORM.moduleName('./abt-carousel')]);
  config.globalResources([PLATFORM.moduleName('./abt-carousel-image-item')]);
  config.globalResources([PLATFORM.moduleName('./abt-carousel-html-item')]);
}
