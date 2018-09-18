import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './at-qrcode';

export function configure(config: FrameworkConfiguration) {

    config.globalResources([
        PLATFORM.moduleName('./at-qrcode')
    ]);
}
