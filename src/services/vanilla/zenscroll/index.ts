import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';
import { ZenscrollService } from './zenscroll-service';
import * as zenscroll from 'zenscroll';

export function configure(config: FrameworkConfiguration) {
    config.container.registerSingleton(ZenscrollService, () => {
        return zenscroll;
    });
}
