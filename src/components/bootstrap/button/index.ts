import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';


export * from './aut-button';

export function configure(config: FrameworkConfiguration) {

    config.globalResources( [
            PLATFORM.moduleName('./aut-button')
    ] );

}
