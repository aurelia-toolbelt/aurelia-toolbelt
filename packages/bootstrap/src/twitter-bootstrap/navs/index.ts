import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';


export * from './abt-navs';
export * from './abt-nav-item';

export function configure(config: FrameworkConfiguration) {

    config.globalResources([
        PLATFORM.moduleName('./abt-navs'),
        PLATFORM.moduleName('./abt-nav-item')
    ]);
}
