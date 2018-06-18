import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './abt-tokenize';
export * from './abt-tokenize-item';

export function configure(config: FrameworkConfiguration) {
    config.globalResources([
        PLATFORM.moduleName('./abt-tokenize'),
        PLATFORM.moduleName('./abt-tokenize-item')
    ]);
}
