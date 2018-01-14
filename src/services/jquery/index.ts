import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

import * as zenscroll from 'zenscroll';

export function configure(config: FrameworkConfiguration) {
    config
     .feature(PLATFORM.moduleName('aurelia-toolbelt/services/jquery/toastr/index'));
}
