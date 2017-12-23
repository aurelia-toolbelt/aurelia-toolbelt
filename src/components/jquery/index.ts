import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/jquery/block-ui/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/jquery/lazy-image/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/jquery/metis-menu/index'))
    .feature(PLATFORM.moduleName('aurelia-toolbelt/components/jquery/news-ticker/index'))

    ;
}
