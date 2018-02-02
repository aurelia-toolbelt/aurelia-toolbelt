import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';


export * from './abt-card-image';
export * from './abt-card-text';

export function configure(config: FrameworkConfiguration) {
    config.globalResources([
        PLATFORM.moduleName('./abt-card-body.html'),
        PLATFORM.moduleName('./abt-card-columns.html'),
        PLATFORM.moduleName('./abt-card-deck.html'),
        PLATFORM.moduleName('./abt-card-footer.html'),
        PLATFORM.moduleName('./abt-card-group.html'),
        PLATFORM.moduleName('./abt-card-header.html'),
        PLATFORM.moduleName('./abt-card-image-overlay.html'),
        PLATFORM.moduleName('./abt-card-image'),
        PLATFORM.moduleName('./abt-card-subtitle.html'),
        PLATFORM.moduleName('./abt-card-text'),
        PLATFORM.moduleName('./abt-card-title.html'),
        PLATFORM.moduleName('./abt-card.html'),
        PLATFORM.moduleName('./abt-card-link.html')
    ]);
}
