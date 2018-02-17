
import 'jquery';

// import * as toastr from 'toastr';

import { singleton } from 'aurelia-dependency-injection';
import { injectCss } from '../../../decorators/inject-css';


@singleton()
@injectCss('toastr/build/toastr.css')
export class ToastrService {

  constructor(private tr: Toastr) {
  }

  public success(message: string, title?: string, overrides?: ToastrOptions) {
    let settings = null;
    if (overrides) {
      settings = Object.assign(overrides);
    }
    this.tr.success(message, title, settings || overrides);
  }
  public error(message: string, title?: string, overrides?: ToastrOptions) {
    let settings = null;
    if (overrides) {
      settings = Object.assign(overrides);
    }
    this.tr.error(message, title, settings || overrides);
  }
  public info(message: string, title?: string, overrides?: ToastrOptions) {
    let settings = null;
    if (overrides) {
      settings = Object.assign(overrides);
    }
    this.tr.info(message, title, settings || overrides);
  }
  public warning(message: string, title?: string, overrides?: ToastrOptions) {
    let settings = null;
    if (overrides) {
      settings = Object.assign(overrides);
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
