import { DOM, containerless, inject, bindingMode, bindable } from 'aurelia-framework';
import { customElement } from 'aurelia-templating';


export type Placement = 'append' | 'prepend';

@containerless()
@customElement('abt-navbar-text')
export class BootstrapNavBarText {
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string;

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public placement: Placement = 'append';


  private navbarText: Element;

  private attached() {

    if (this.placement === 'prepend') {
      this.navbarText.classList.add('abt-navbar-text-prepend');
    }
    if (this.placement === 'append') {
      this.navbarText.classList.add('abt-navbar-text-append');
    }
  }

}
