import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';


export * from './aut-metis-item';
export * from './aut-metis-menu';


export function configure(config: FrameworkConfiguration) {
    config.globalResources([
        PLATFORM.moduleName('./aut-metis-item'),
        PLATFORM.moduleName('./aut-metis-menu')
    ]);
}
