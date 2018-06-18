import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';


export * from './aut-mark-down';

export function configure(config: FrameworkConfiguration) {

    config.globalResources([
        PLATFORM.moduleName('./aut-mark-down')
    ]);
}
