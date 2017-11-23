import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration): void {
    config.globalResources(PLATFORM.moduleName('./append'));
    config.globalResources(PLATFORM.moduleName('./appendArray'));
    config.globalResources(PLATFORM.moduleName('./at'));
    config.globalResources(PLATFORM.moduleName('./base64decode'));
    config.globalResources(PLATFORM.moduleName('./base64encode'));
    config.globalResources(PLATFORM.moduleName('./between'));
    config.globalResources(PLATFORM.moduleName('./bindecode'));
    config.globalResources(PLATFORM.moduleName('./binencode'));
    config.globalResources(PLATFORM.moduleName('./chars'));
    config.globalResources(PLATFORM.moduleName('./collapsewhitespace'));
    config.globalResources(PLATFORM.moduleName('./compare'));
}
