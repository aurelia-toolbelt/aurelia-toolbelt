import { IAutBlockUIOption } from './aut-block-ui-option';
import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './aut-block-ui';
export function configure(config: FrameworkConfiguration, option?: IAutBlockUIOption) {
    config.globalResources([PLATFORM.moduleName('./aut-block-ui')]);
    config.container.registerInstance('aut-block-ui-option', option);
}
