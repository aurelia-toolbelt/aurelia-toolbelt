import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';



export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./aut-float-label')
  ]);
}


// config.globalResources([
//   PLATFORM.moduleName('./bootstrap-float-label'),
//   PLATFORM.moduleName('./aut-block-ui'),
//   PLATFORM.moduleName('./masked-input/masked-input')
// ]);
