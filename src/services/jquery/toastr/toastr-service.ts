
import { IToastrServiceOptions } from './toastr-service-options';
import { transient, customElement, inject, containerless, bindable, bindingMode, observable, DOM, singleton, noView } from 'aurelia-framework';

import * as toastr from 'toastr';
import 'toastr/build/toastr.css';
@singleton()
@inject(toastr/*, 'toastr-service-options'*/)
export class ToastrService {
    constructor(private tr: Toastr/*, private toastrOptions?: IToastrServiceOptions*/) {
        // if (toastrOptions) {
        //     toastrService.options = toastrOptions;
        // }
    }
    public success(message: string, title?: string, overrides?: IToastrServiceOptions) {

        let settings = null;
        if (overrides) {
            settings = Object.assign(overrides/*, this.toastrOptions*/);
        }
        this.tr.success(message, title, settings || overrides);
    }
    public error(message: string, title?: string, overrides?: IToastrServiceOptions) {
        let settings = null;
        if (overrides) {
            settings = Object.assign(overrides/*, this.toastrOptions*/);
        }
        this.tr.error(message, title, settings || overrides);
    }
    public info(message: string, title?: string, overrides?: IToastrServiceOptions) {
        let settings = null;
        if (overrides) {
            settings = Object.assign(overrides/*, this.toastrOptions*/);
        }
        this.tr.info(message, title, settings || overrides);
    }
    public warning(message: string, title?: string, overrides?: IToastrServiceOptions) {
        let settings = null;
        if (overrides) {
            settings = Object.assign(overrides/*, this.toastrOptions*/);
        }
        this.tr.warning(message, title, settings || overrides);
    }

    public clear(toast?: JQuery, clearOptions?: { force: boolean }) {
        this.tr.clear(toast, clearOptions);
    }

    public remove() {
        this.tr.remove();
    }

    public subscribe(callback: (response: ToastrResponse) => any): void {
        this.tr.subscribe(callback);
    }
}
