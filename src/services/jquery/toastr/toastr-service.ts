
import { IToastrServiceOptions } from './toastr-service-options';
import { transient, customElement, inject, containerless, bindable, bindingMode, observable, DOM, singleton, noView } from 'aurelia-framework';

import * as toastr from 'toastr';
import 'toastr/build/toastr.css';
@singleton()
@inject(toastr/*, 'toastr-service-options'*/)
export class ToastrService {
    constructor(private toastrService: Toastr/*, private toastrOptions?: IToastrServiceOptions*/) {
        // if (toastrOptions) {
        //     toastrService.options = toastrOptions;
        // }
    }
    public success(message: string, title?: string, overrides?: IToastrServiceOptions) {

        let settings = null;
        if (overrides) {
            settings = Object.assign(overrides/*, this.toastrOptions*/);
        }
        this.toastrService.success(message, title, settings || overrides);
    }
    public error(message: string, title?: string, overrides?: IToastrServiceOptions) {
        let settings = null;
        if (overrides) {
            settings = Object.assign(overrides/*, this.toastrOptions*/);
        }
        this.toastrService.error(message, title, settings || overrides);
    }
    public info(message: string, title?: string, overrides?: IToastrServiceOptions) {
        let settings = null;
        if (overrides) {
            settings = Object.assign(overrides/*, this.toastrOptions*/);
        }
        this.toastrService.info(message, title, settings || overrides);
    }
    public warning(message: string, title?: string, overrides?: IToastrServiceOptions) {
        let settings = null;
        if (overrides) {
            settings = Object.assign(overrides/*, this.toastrOptions*/);
        }
        this.toastrService.warning(message, title, settings || overrides);
    }

    public clear(toast?: JQuery, clearOptions?: { force: boolean }) {
        this.toastrService.clear(toast, clearOptions);
    }

    public remove() {
        this.toastrService.remove();
    }

    public subscribe(callback: (response: ToastrResponse) => any): void {
        this.toastrService.subscribe(callback);
    }
}
