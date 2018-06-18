import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';


export * from './abt-card-body';
export * from './abt-card-columns';
export * from './abt-card-deck';
export * from './abt-card-footer';
export * from './abt-card-group';
export * from './abt-card-header';
export * from './abt-card-image-overlay';
export * from './abt-card-image';
export * from './abt-card-subtitle';
export * from './abt-card-text';
export * from './abt-card-title';
export * from './abt-card';
export * from './abt-card-link';

export function configure(config: FrameworkConfiguration) {
    config.globalResources([
        PLATFORM.moduleName('./abt-card-body'),
        PLATFORM.moduleName('./abt-card-columns'),
        PLATFORM.moduleName('./abt-card-deck'),
        PLATFORM.moduleName('./abt-card-footer'),
        PLATFORM.moduleName('./abt-card-group'),
        PLATFORM.moduleName('./abt-card-header'),
        PLATFORM.moduleName('./abt-card-image-overlay'),
        PLATFORM.moduleName('./abt-card-image'),
        PLATFORM.moduleName('./abt-card-subtitle'),
        PLATFORM.moduleName('./abt-card-text'),
        PLATFORM.moduleName('./abt-card-title'),
        PLATFORM.moduleName('./abt-card'),
        PLATFORM.moduleName('./abt-card-link')
    ]);
}
