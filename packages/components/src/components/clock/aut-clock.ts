import { customElement, bindable, bindingMode, useShadowDOM } from 'aurelia-framework';
import { containerless } from 'aurelia-templating';

@containerless()
@customElement('aut-clock')
export class ClockCustomElement {

  // Private fields:
  private value: Date;
  private timer: any;
  /*  ************************************************* */

  /* One Time bindings */
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public text: string = 'Aurelia is awesome';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public color: string = '#753B85';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public shadowColor: string = ''; // = '#C8167A';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public fontSize: string | number = '40';
  /* ************************************************************************* */

  /** One way bindings */
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public locale: string = 'en';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public dateFormat: string = 'YYYY/MM/DD';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public be24Hours: string | boolean = true;

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public showText: string | boolean = true;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public showDate: string | boolean = true;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public showTime: string | boolean = true;
  /* ************************************************************************* */


  private attached() {

    this.value = new Date();
    let self = this;

    return new Promise(resolve => {

      this.timer = setInterval(() => {
        self.value = new Date();
      }, 1000);

      resolve();

    });
  }

  private detached() {
    clearTimeout(this.timer);
  }

}
