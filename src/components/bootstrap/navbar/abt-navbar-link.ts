import { DOM, containerless, inject, bindingMode, bindable } from 'aurelia-framework';
import { customElement } from 'aurelia-templating';

@inject(Element)
@containerless()
@customElement('abt-navbar-link')
export class BootstrapNavBarLink {
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public href: string = '#';

  private navDropDown: Element;
  private navLinkDropDown: Element;

  @bindable({ defaultBindingMode: bindingMode.twoWay }) public click: Function;

  private afterAttached() {
    let isActive = this.navDropDown.hasAttribute('active');
    let isDisabled = this.navDropDown.hasAttribute('disabled');

    if (isActive) {
      this.navLinkDropDown.classList.add('active');
    }
    if (isDisabled) {
      this.navLinkDropDown.classList.add('disabled');
    }
  }


  private onClick(event: Event) {

    event.preventDefault();

    if (this.click) {
      this.click({ event: event });
    }

  }

}
