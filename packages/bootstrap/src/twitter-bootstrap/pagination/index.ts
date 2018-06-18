import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './abt-pagination';

export function configure(config: FrameworkConfiguration) {
    config.globalResources([
        PLATFORM.moduleName('./abt-pagination')
    ]);
}

