import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';


export * from './aut-scrollup';

export function configure(config: FrameworkConfiguration) {

    config.globalResources([
        PLATFORM.moduleName('./aut-scrollup')
    ]);
}
