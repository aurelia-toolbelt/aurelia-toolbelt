import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';


export * from './elements/mark-down';

export function configure(config: FrameworkConfiguration) {

    config.globalResources([
        PLATFORM.moduleName('./elements/mark-down')
    ]);
}
