import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './aut-password';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([PLATFORM.moduleName('./aut-password')]);
}
