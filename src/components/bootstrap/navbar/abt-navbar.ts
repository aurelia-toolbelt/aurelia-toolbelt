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

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public controllBy: string[];

  private navbar: Element;
  private navbarCollapse: Element;

  private afterAttached() {
    this.navbar.classList.add(`navbar-${this.colorClass}`);
    this.navbar.classList.add(`bg-${this.backgroundColorClass}`);

    if (this.expandSize !== 'none') {
      this.navbar.classList.add(`navbar-expand-${this.expandSize}`);
    }

    let navbarToggler = <HTMLButtonElement>this.navbar.querySelector('.navbar-toggler');
    if (navbarToggler) {
      navbarToggler.setAttribute('data-target', `#${this.navbarCollapse.id}`);
      navbarToggler.setAttribute('aria-controls', `${this.navbarCollapse.id}`);
    }
  }
}
