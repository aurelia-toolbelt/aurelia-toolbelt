import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';


export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./moment-vc'),
    PLATFORM.moduleName('./moment-timezone-vc'),
    PLATFORM.moduleName('./humanize-duration-vc')
  ]);
}
