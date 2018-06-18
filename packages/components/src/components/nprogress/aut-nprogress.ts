import * as nprogress from 'nprogress';
import { bindable, noView, PLATFORM, customElement, bindingMode, singleton, inject, DOM, viewResources } from 'aurelia-framework';

import 'nprogress/nprogress.css';




@noView()
@customElement('aut-nprogress')
export class NProgressLoadingIndicator {

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public loading = false;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public showSpinner: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public easing: string = 'ease';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public speed: number = 500;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public color: string = '#753B85';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public size: number = 4;


  private attached() {
    this.showSpinner = this.showSpinner === true || this.showSpinner === 'true';
    nprogress.configure({ showSpinner: this.showSpinner, easing: this.easing, speed: this.speed });

    DOM.injectStyles(`#nprogress .bar {
      background: ${this.color} !important;
      height: ${this.size}px !important;
    }
    #nprogress .peg {
      box-shadow: 0 0 10px ${this.color}, 0 0 5px ${this.color} !important;
    }
    #nprogress .spinner-icon {
      border-top-color: ${this.color} !important;
      border-left-color: ${this.color} !important;
    }`, null, null, 'aut-injected-nprogress');
  }

  private loadingChanged(newValue: boolean) {
    if (newValue) {
      nprogress.start();
    } else {
      nprogress.done();
    }
  }
}
