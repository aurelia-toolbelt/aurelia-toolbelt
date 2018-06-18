import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';


export * from './aut-divider';

export function configure(config: FrameworkConfiguration) {

    config.globalResources([
        PLATFORM.moduleName('./aut-divider')
    ]);
}
