import { containerless, customElement } from 'aurelia-framework';
import { inject } from 'aurelia-dependency-injection';
import { bindable } from 'aurelia-templating';
import { bindingMode } from 'aurelia-binding';



@inject(Element)
@containerless()
@customElement('abt-jumbotron')
export class BootstrapJumbotron {



  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string = '';

  @bindable({ defaultBindingMode: bindingMode.oneTime }) public fluid: boolean | string = false;


  constructor(private element: Element) {
  }


  private attached() {

    const onlyDismissibleAttribute = (this.fluid === '' && this.element.hasAttribute('fluid'));
    this.fluid = onlyDismissibleAttribute || this.fluid.toString() === 'true';

  }

}
