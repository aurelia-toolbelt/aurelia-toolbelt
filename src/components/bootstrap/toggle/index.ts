import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './abt-toggle';

export function configure(config: FrameworkConfiguration) {
    config.globalResources([
        PLATFORM.moduleName('./abt-toggle')
    ]);
}
