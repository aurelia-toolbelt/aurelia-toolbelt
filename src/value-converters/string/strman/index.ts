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
    config.globalResources(PLATFORM.moduleName('./contains'));
    config.globalResources(PLATFORM.moduleName('./containsall'));
    config.globalResources(PLATFORM.moduleName('./containsany'));
    config.globalResources(PLATFORM.moduleName('./countsubstr'));
    config.globalResources(PLATFORM.moduleName('./decdecode'));
    config.globalResources(PLATFORM.moduleName('./decencode'));
    config.globalResources(PLATFORM.moduleName('./endswith'));
    config.globalResources(PLATFORM.moduleName('./ensureleft'));
    config.globalResources(PLATFORM.moduleName('./ensureright'));
    config.globalResources(PLATFORM.moduleName('./equal'));
    config.globalResources(PLATFORM.moduleName('./first'));
    config.globalResources(PLATFORM.moduleName('./format'));
    config.globalResources(PLATFORM.moduleName('./hexdecode'));
    config.globalResources(PLATFORM.moduleName('./hexencode'));
    config.globalResources(PLATFORM.moduleName('./htmldecode'));
    config.globalResources(PLATFORM.moduleName('./htmlencode'));
    config.globalResources(PLATFORM.moduleName('./inequal'));

}
