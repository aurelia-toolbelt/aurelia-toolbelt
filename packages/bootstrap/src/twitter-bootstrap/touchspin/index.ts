import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './abt-touchspin';

export function configure(config: FrameworkConfiguration) {
    config.globalResources([
        PLATFORM.moduleName('./abt-touchspin')
    ]);
}
