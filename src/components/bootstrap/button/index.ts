import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';


export * from './abt-button';

export function configure(config: FrameworkConfiguration) {

    config.globalResources( [
            PLATFORM.moduleName('./abt-button')
    ] );

}
