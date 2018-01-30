import { DOM, containerless, inject, bindingMode, bindable } from 'aurelia-framework';
import { customElement } from 'aurelia-templating';

@inject(Element)
@containerless()
@customElement('abt-navbar-brand')
export class BootstrapNavBarBrand {
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public click: Function;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public id: string;

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public href: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public heading: boolean | string = false;

  private navbarBrand: Element;
  private navbarBrandTemplate: Element;

  private onClick(event: Event) {

    if (this.click) {
      this.click({ event: event });
    }

    return true;

  }

  private afterAttached() {
    let isHeading = Boolean(this.heading) || this.navbarBrandTemplate.hasAttribute('heading');
    if (isHeading) {
      this.navbarBrand.classList.add('abt-navbar-brand-heading');
    } else {
      this.navbarBrand.classList.remove('abt-navbar-brand-heading');
    }
  }
}
