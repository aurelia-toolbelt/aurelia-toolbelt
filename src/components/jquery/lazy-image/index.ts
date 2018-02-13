import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './aut-lazy-image';

export function configure(config: FrameworkConfiguration) {
    config.globalResources([PLATFORM.moduleName('./aut-lazy-image')]);
}
