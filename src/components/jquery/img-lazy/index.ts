import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './aut-img-lazy';
export function configure(config: FrameworkConfiguration) {
    config.globalResources([PLATFORM.moduleName('./aut-img-lazy')]);
}
