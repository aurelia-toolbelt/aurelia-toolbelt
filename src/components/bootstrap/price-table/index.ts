import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './at-price-table';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./at-price-table'),
  ]);
}
