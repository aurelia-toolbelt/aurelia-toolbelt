import { DOM, containerless, inject, bindingMode, bindable } from 'aurelia-framework';
import { customElement } from 'aurelia-templating';

@inject(Element)
@containerless()
@customElement('abt-navbar-dropdown-mega-item')
export class BootstrapNavBarDropDownMegaItem {
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public href: string = '#';
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public click: Function;



  private onClick(event: Event) {

    event.preventDefault();

    if (this.click) {
      this.click({ event: event });
    }

  }
}
