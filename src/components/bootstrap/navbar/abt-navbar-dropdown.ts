import { DOM, containerless, inject } from 'aurelia-framework';
import { customElement } from 'aurelia-templating';

@inject(Element)
@containerless()
@customElement('abt-navbar-dropdown')
export class BootstrapNavBarDropDown {

  private navItem: Element;
  private navItemList: Element;
  private navListDropDown: Element;

  private attached() {
    let isMegaMenu = this.navItem.hasAttribute('megamenu');
    let isMegaMenuFullWidth = this.navItem.hasAttribute('megamenu-fullwidth');

    if (isMegaMenuFullWidth) {
      this.navListDropDown.classList.add('navbar-megamenu-fullwidth');
    }

  }
}
