import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './aut-metis-menu';
export * from './aut-metis-menu-group';
export * from './aut-metis-menu-item';

export function configure(config: FrameworkConfiguration) {
    config.globalResources([
        PLATFORM.moduleName('./aut-metis-menu'),
        PLATFORM.moduleName('./aut-metis-menu-group'),
        PLATFORM.moduleName('./aut-metis-menu-item')
    ]);
}
