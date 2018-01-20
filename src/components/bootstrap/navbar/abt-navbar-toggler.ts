import { DOM, containerless, inject, bindingMode, bindable } from 'aurelia-framework';
import { customElement } from 'aurelia-templating';

@containerless()
@customElement('abt-navbar-toggler')
export class BootstrapNavBarToggler {
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public togglerIconClass: string = 'navbar-toggler-icon';

}
