import { DOM, containerless, inject, bindingMode, bindable } from 'aurelia-framework';
import { customElement } from 'aurelia-templating';

@containerless()
@customElement('abt-navbar-toggler')
export class BootstrapNavBarToggler {
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public togglerIcon: string = 'navbar-toggler-icon';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public id: string;
}
