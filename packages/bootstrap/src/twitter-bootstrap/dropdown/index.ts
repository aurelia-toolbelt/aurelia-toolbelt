import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './abt-dropdown';
export * from './abt-dropdown-item';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./abt-dropdown'),
    PLATFORM.moduleName('./abt-dropdown-item'),
    PLATFORM.moduleName('./abt-dropdown-divider.html'),
    PLATFORM.moduleName('./abt-dropdown-header.html')
  ]);
}
