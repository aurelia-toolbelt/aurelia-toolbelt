import * as nprogress from 'nprogress';
import { bindable, noView, PLATFORM, customElement, bindingMode, singleton, inject, DOM } from 'aurelia-framework';

import 'nprogress/nprogress.css';


@singleton()
export class NProgressStyleInjector {

  private isAlreadyOverridden = false;

  public overrideStyle(color: string, size: number) {

    if (this.isAlreadyOverridden) {
      return;
    }

    this.isAlreadyOverridden = true;

    DOM.injectStyles(`#nprogress .bar {
         background: ${color} !important;
         height: ${size}px !important;
       }
       #nprogress .peg {
         box-shadow: 0 0 10px ${color}, 0 0 5px ${color} !important;
       }
       #nprogress .spinner-icon {
         border-top-color: ${color} !important;
         border-left-color: ${color} !important;
       }`);
  }

}


@noView([PLATFORM.moduleName('nprogress/nprogress.css')])
@customElement('aut-nprogress')
@inject(NProgressStyleInjector)
export class NProgressLoadingIndicator {

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public loading = false;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public showSpinner: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public easing: string = 'ease';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public speed: number = 500;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public color: string = '#753B85';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public size: number = 4;

  constructor(private injector: NProgressStyleInjector) {

  }

  private attached() {
    this.showSpinner = this.showSpinner === true || this.showSpinner === 'true';
    nprogress.configure({ showSpinner: this.showSpinner, easing: this.easing, speed: this.speed });
    this.injector.overrideStyle(this.color, this.size);
  }

  private loadingChanged(newValue: boolean) {
    if (newValue) {
      nprogress.start();
    } else {
      nprogress.done();
    }
  }
}
