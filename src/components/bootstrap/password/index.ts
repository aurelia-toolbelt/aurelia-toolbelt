import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './abt-password';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([PLATFORM.moduleName('./abt-password')]);
}
