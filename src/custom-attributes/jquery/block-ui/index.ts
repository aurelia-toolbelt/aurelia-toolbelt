import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';



export * from './aut-block-ui-options';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./aut-block-ui')
  ]);
}
