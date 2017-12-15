import { IAutBlockUIOptions } from './aut-block-ui-options';
import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './aut-block-ui';
export function configure(config: FrameworkConfiguration, option?: IAutBlockUIOptions) {
    config.globalResources([PLATFORM.moduleName('./aut-block-ui')]);
    config.container.registerInstance('aut-block-ui-option', option);
}
