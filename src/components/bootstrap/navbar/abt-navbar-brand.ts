import { DOM, containerless, inject, bindingMode, bindable } from 'aurelia-framework';
import { customElement } from 'aurelia-templating';

@inject(Element)
@containerless()
@customElement('abt-navbar-brand')
export class BootstrapNavBarBrand {
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public click: Function;

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public href: string = '#';

  private onClick(event: Event) {

    // event.preventDefault();

    if (this.click) {
      this.click({ event: event });
    }

    return true;

  }
}
