import { DOM, containerless, inject, bindingMode, bindable } from 'aurelia-framework';
import { customElement } from 'aurelia-templating';

@inject(Element)
@containerless()
@customElement('abt-navbar-link')
export class BootstrapNavBarLink {
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public href: string = '#';

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public linkClass: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public linkStyle: string = '';

  private navItem: Element;
  private navItemLink: Element;

  @bindable({ defaultBindingMode: bindingMode.twoWay }) public click: Function;

  private afterAttached() {
    let isActive = this.navItem.hasAttribute('active');
    let isDisabled = this.navItem.hasAttribute('disabled');

    if (isActive) {
      this.navItemLink.classList.add('active');
    }
    if (isDisabled) {
      this.navItemLink.classList.add('disabled');
    }
  }


  private onClick(event: Event) {

    event.preventDefault();

    if (this.click) {
      this.click({ event: event });
    }

  }

}
