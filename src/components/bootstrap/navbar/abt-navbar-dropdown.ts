import { DOM, containerless, inject, bindingMode, bindable } from 'aurelia-framework';
import { customElement } from 'aurelia-templating';

@inject(Element)
@containerless()
@customElement('abt-navbar-dropdown')
export class BootstrapNavBarDropDown {
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public title: string;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public click: Function;

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public linkClass: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public linkStyle: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public dropdownClass: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public dropdownStyle: string = '';

  private navDropDown: Element;
  private navListDropDown: Element;

  private attached() {
    let isMegaMenuFullWidth = this.navDropDown.hasAttribute('fullwidth');

    if (isMegaMenuFullWidth) {
      this.navListDropDown.classList.add('navbar-megamenu-fullwidth');
    }
  }


  private onClick(event: Event) {
    event.preventDefault();

    if (this.click) {
      this.click({ event: event });
    }

  }
}
