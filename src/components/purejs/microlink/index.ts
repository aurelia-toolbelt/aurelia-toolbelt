import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';


export * from './aut-microlink';

export function configure(config: FrameworkConfiguration) {

    config.globalResources([
        PLATFORM.moduleName('./aut-microlink')
    ]);
}
