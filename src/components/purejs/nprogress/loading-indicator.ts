import * as nprogress from 'nprogress';
import { bindable, noView, PLATFORM, customElement, bindingMode } from 'aurelia-framework';

import 'nprogress/nprogress.css';

@noView([PLATFORM.moduleName('nprogress/nprogress.css')])
@customElement('aut-loading-indicator')
export class LoadingIndicator {


  @bindable({ defaultBindingMode: bindingMode.oneWay }) public loading = false;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public showSpinner: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public easing: string = 'ease';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public speed: number = 500;

  private attached() {
    this.showSpinner = this.showSpinner === true || this.showSpinner === 'true';
    nprogress.configure({ showSpinner: this.showSpinner, easing: this.easing, speed: this.speed });
  }

  private loadingChanged(newValue: boolean) {
    if (newValue) {
      nprogress.start();
    } else {
      nprogress.done();
    }
  }
}
