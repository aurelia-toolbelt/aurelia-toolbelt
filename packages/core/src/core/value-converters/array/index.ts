import { PLATFORM, FrameworkConfiguration } from 'aurelia-framework';



export function configure(config: FrameworkConfiguration) {

    config.globalResources([
        PLATFORM.moduleName('./order-by'),
        PLATFORM.moduleName('./group-by'),
        PLATFORM.moduleName('./filter-by')
    ]);
}
