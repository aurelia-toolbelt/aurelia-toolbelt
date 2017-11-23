import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration): void {
    config.globalResources(PLATFORM.moduleName('./append'));
    config.globalResources(PLATFORM.moduleName('./appendArray'));
    config.globalResources(PLATFORM.moduleName('./at'));
    config.globalResources(PLATFORM.moduleName('./base64decode'));
    config.globalResources(PLATFORM.moduleName('./base64encode'));
    config.globalResources(PLATFORM.moduleName('./between'));
}
