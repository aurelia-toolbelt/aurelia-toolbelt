import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './elements/bootstrap-toggle';

export function configure(config: FrameworkConfiguration) {
    config.globalResources([
        PLATFORM.moduleName('./elements/bootstrap-toggle')
    ]);
}
