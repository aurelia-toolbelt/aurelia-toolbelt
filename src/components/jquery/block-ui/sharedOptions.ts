import { singleton } from 'aurelia-dependency-injection';

// We save all options per conponent. [id, settings from component, option from plugin, default options]
@singleton()
export class SharedOptions {
    private allOptions: any = {};

    public getOption(id: string): any {
        return this.allOptions[id];
    }

    public setOption(id: string, obj: any) {
        this.allOptions[id] = {
            id: id,
            settings: obj.settings,
            option: obj.option,
            default: obj.default
        };
    }

    public dispose() {
        this.allOptions = {};
    }
}
