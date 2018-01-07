import { customElement, containerless, bindable, bindingMode } from 'aurelia-framework';
import { inject } from 'aurelia-dependency-injection';



@inject(Element)
@containerless()
@customElement('abt-alert')
export class BootstrapAlert {

  @bindable({ defaultBindingMode: bindingMode.oneTime }) public class: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public style: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public size: string = 'md';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public color: string = 'primary';

  @bindable({ defaultBindingMode: bindingMode.oneTime }) public dismissible: boolean | string = false;


  constructor(private element: Element) {
  }

  private attached() {

    let onlyAttribute = (this.dismissible === '' && this.element.hasAttribute('dismissible'));

    this.dismissible = onlyAttribute || this.dismissible.toString() === 'true';
  }

}
