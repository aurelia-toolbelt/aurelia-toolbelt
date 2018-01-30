import { DOM, containerless, inject, bindingMode, bindable } from 'aurelia-framework';
import { customElement } from 'aurelia-templating';

@inject(Element)
@containerless()
@customElement('abt-navbar-link')
export class BootstrapNavBarLink {
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public id: string;

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public href: string;

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public linkClass: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public linkStyle: string;

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public active: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public disabled: boolean | string = false;

  @bindable({ defaultBindingMode: bindingMode.twoWay }) public click: Function;


  private navItem: Element;
  private navItemLink: Element;


  private afterAttached() {
    let isActive = Boolean(this.active) || this.navItem.hasAttribute('active');
    let isDisabled = Boolean(this.disabled) || this.navItem.hasAttribute('disabled');
    if (isActive) {
      this.navItemLink.classList.add('active');
      this.navItemLink.classList.remove('disabled');
    }
    if (isDisabled) {
      this.navItemLink.classList.remove('active');
      this.navItemLink.classList.add('disabled');
    }
  }


  private onClick(event: Event) {
    if (this.click) {
      this.click({ event: event });
    }
    return true;
  }
}
