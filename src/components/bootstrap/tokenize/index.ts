import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './abt-tokenize';

export function configure(config: FrameworkConfiguration) {
    config.globalResources([
        PLATFORM.moduleName('./abt-tokenize')
    ]);
}
