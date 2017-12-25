import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./abt-progress.html'),
    PLATFORM.moduleName('./abt-progress-bar')
  ]);
}
