import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './abt-navbar';
export * from './abt-navbar-brand';
export * from './abt-navbar-link';
export * from './abt-navbar-dropdown';
export * from './abt-navbar-dropdown-item';
export * from './abt-navbar-dropdown-divider';
export * from './abt-navbar-toggler';
export * from './abt-navbar-text';
export * from './abt-navbar-dropdown-mega-item';
export * from './abt-navbar-collapser';
export * from './abt-navbar-nav';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([PLATFORM.moduleName('./abt-navbar')]);
  config.globalResources([PLATFORM.moduleName('./abt-navbar-brand')]);
  config.globalResources([PLATFORM.moduleName('./abt-navbar-link')]);
  config.globalResources([PLATFORM.moduleName('./abt-navbar-dropdown')]);
  config.globalResources([PLATFORM.moduleName('./abt-navbar-dropdown-item')]);
  config.globalResources([PLATFORM.moduleName('./abt-navbar-dropdown-divider')]);
  config.globalResources([PLATFORM.moduleName('./abt-navbar-toggler')]);
  config.globalResources([PLATFORM.moduleName('./abt-navbar-text')]);
  config.globalResources([PLATFORM.moduleName('./abt-navbar-dropdown-mega-item')]);
  config.globalResources([PLATFORM.moduleName('./abt-navbar-collapser')]);
  config.globalResources([PLATFORM.moduleName('./abt-navbar-nav')]);
}
