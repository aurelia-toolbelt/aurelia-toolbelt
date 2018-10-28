import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';
import { LozadService } from './lozad-service';
import * as lozad from 'lozad';

export function configure(config: FrameworkConfiguration) {
    config.container.registerSingleton(LozadService, () => {
        return lozad;
    });
}
