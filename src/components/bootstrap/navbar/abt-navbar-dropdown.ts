import { DOM, containerless, inject, bindingMode, bindable } from 'aurelia-framework';
import { customElement } from 'aurelia-templating';


type Placement = 'up' | 'down' | 'right' | 'left';
@inject(Element)
@containerless()
@customElement('abt-navbar-dropdown')
export class BootstrapNavBarDropDown {
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public fulWidth: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public title: string;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public click: Function;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public headerClass: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public headerStyle: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public contentClass: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public contentStyle: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public placement: Placement = 'down';

  private navDropDown: Element;
  private navListDropDown: Element;
  private dropDownMenu: Element;
  private navLinkDropDown: Element;

  private afterAttached() {

    switch (this.placement) {
      case 'up':
        this.navListDropDown.classList.add('dropup');
        break;
      case 'right':
        this.navListDropDown.classList.add('dropright');
        break;
      case 'left':
        this.navListDropDown.classList.add('dropleft');
        break;
      case 'down':
        this.navListDropDown.classList.add('dropdown');
        break;
    }


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
