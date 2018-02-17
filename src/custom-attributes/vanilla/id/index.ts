import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';



export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./aut-id'),
    PLATFORM.moduleName('./aut-id-group')
  ]);
}
