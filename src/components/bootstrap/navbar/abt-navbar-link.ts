import { DOM, containerless, inject, bindingMode, bindable } from 'aurelia-framework';
import { customElement } from 'aurelia-templating';

@inject(Element)
@containerless()
@customElement('abt-navbar-link')
export class BootstrapNavBarLink {
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public href: string = '#';

  private navItem: Element;
  private navItemList: Element;

  @bindable({ defaultBindingMode: bindingMode.twoWay }) public click: Function;

  private afterAttached() {
    let isActive = this.navItem.hasAttribute('active');
    let isDisabled = this.navItem.hasAttribute('disabled');

    if (isActive) {
      this.navItemList.classList.add('active');
    }
    if (isDisabled) {
      this.navItemList.classList.add('disabled');
    }
  }


  private onClick(event: Event) {

    event.preventDefault();

    if (this.click) {
      this.click({ event: event });
    }

  }

}
