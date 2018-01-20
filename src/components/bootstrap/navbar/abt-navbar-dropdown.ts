import { DOM, containerless, inject, bindingMode, bindable } from 'aurelia-framework';
import { customElement } from 'aurelia-templating';

@inject(Element)
@containerless()
@customElement('abt-navbar-dropdown')
export class BootstrapNavBarDropDown {
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public title: string;

  private navDropDown: Element;
  private navListDropDown: Element;
  private navLinkDropDown: Element;

  private attached() {
    let isMegaMenuFullWidth = this.navDropDown.hasAttribute('fullwidth');

    if (isMegaMenuFullWidth) {
      this.navListDropDown.classList.add('navbar-megamenu-fullwidth');
    }
  }
}
