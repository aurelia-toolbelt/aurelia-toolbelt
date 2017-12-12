import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
    config.globalResources(PLATFORM.moduleName('./stringifyfa'));
    config.globalResources(PLATFORM.moduleName('./stringifyrial'));
    config.globalResources(PLATFORM.moduleName('./stringifytoman'));
    config.globalResources(PLATFORM.moduleName('./rial'));
    config.globalResources(PLATFORM.moduleName('./toman'));
    config.globalResources(PLATFORM.moduleName('./persianchars'));
    config.globalResources(PLATFORM.moduleName('./persiankeyboard'));
    config.globalResources(PLATFORM.moduleName('./persianurl'));
}
