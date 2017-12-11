import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './abt-badge';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./abt-badge')
  ]);
}
