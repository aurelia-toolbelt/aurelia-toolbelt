import { DOM, containerless, inject, bindingMode, bindable } from 'aurelia-framework';
import { customElement } from 'aurelia-templating';

@inject(Element)
@containerless()
@customElement('abt-navbar-dropdown')
export class BootstrapNavBarDropDown {
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public fulWidth: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public title: string;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public click: Function;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public linkClass: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public linkStyle: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public dropdownClass: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public dropdownStyle: string;

  private navDropDown: Element;
  private navListDropDown: Element;
  private dropDownMenu: Element;
  private navLinkDropDown: Element;

  private afterAttached() {
    let isMegaMenuFullWidth = this.navDropDown.hasAttribute('full-width') || Boolean(this.fulWidth);

    if (isMegaMenuFullWidth) {
      this.navListDropDown.classList.add('navbar-megamenu-fullwidth');
    } else {
      this.navListDropDown.classList.remove('navbar-megamenu-fullwidth');
    }

  }


  private onClick(event: Event) {

    /*
    // Fix bug #46
    let top = $(this.navListDropDown).offset().top + $(this.navListDropDown).height();
    console.log(top);
    $(this.dropDownMenu).css('top', `${top}px`);
    */
    if (this.click) {
      this.click({ event: event });
    }
    return true;
  }
}
