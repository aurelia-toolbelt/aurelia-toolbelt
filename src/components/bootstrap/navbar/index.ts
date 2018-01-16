import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './abt-navbar';
export * from './abt-navbar-brand';
export * from './abt-navbar-link';
export * from './abt-navbar-dropdown';
export * from './abt-navbar-dropdown-item';
export * from './abt-navbar-dropdown-divider';


export function configure(config: FrameworkConfiguration) {
  config.globalResources([PLATFORM.moduleName('./abt-navbar')]);
  config.globalResources([PLATFORM.moduleName('./abt-navbar-brand')]);
  config.globalResources([PLATFORM.moduleName('./abt-navbar-link')]);
  config.globalResources([PLATFORM.moduleName('./abt-navbar-dropdown')]);
  config.globalResources([PLATFORM.moduleName('./abt-navbar-dropdown-item')]);
  config.globalResources([PLATFORM.moduleName('./abt-navbar-dropdown-divider')]);
}
