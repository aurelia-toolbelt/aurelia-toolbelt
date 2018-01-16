import { DOM, containerless, inject, bindingMode, bindable, children } from 'aurelia-framework';
import { customElement } from 'aurelia-templating';

type ExpandSize = 'none' | 'sm' | 'md' | 'lg';

@inject(Element)
@customElement('abt-navbar')
export class BootstrapNavBar {
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string;

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public colorClass: string = 'light';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public backgroundColorClass: string = 'light';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public expandSize: ExpandSize = 'sm';

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public toggler: boolean = true;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public togglerIconClass: string = 'navbar-toggler-icon';

  @children('.navbar-brand') private brand: Array<HTMLAnchorElement>;

  private navbar: Element;

  private afterAttached() {
    this.navbar.classList.add(`navbar-${this.colorClass}`);
    this.navbar.classList.add(`bg-${this.backgroundColorClass}`);

    if (this.expandSize !== 'none') {
      this.navbar.classList.add(`navbar-expand-${this.expandSize}`);
    }
    let hasMultipleBrands = this.brand.length > 1;

    if (hasMultipleBrands) {
      throw Error('You cannot have multiple instances of [abt-navbar-brand] component, please check your DOM');
    }
    if (this.brand.length === 1) {
      let brandCtrl = this.brand[0];
      this.navbar.insertBefore(brandCtrl, this.navbar.firstChild);
    }

  }
}
