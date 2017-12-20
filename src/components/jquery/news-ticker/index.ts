import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './aut-news-ticker';
export function configure(config: FrameworkConfiguration) {
    config.globalResources([PLATFORM.moduleName('./aut-news-ticker')]);
}
