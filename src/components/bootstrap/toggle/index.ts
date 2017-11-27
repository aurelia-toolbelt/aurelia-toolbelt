import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './BootstrapToggle';

export function configure(config: FrameworkConfiguration) {
    config.globalResources([
        PLATFORM.moduleName('./BootstrapToggle')
    ]);
}
