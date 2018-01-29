import { DOM, containerless, inject, bindingMode, bindable } from 'aurelia-framework';
import { customElement } from 'aurelia-templating';

@containerless()
@customElement('abt-navbar-nav')
export class BootstrapNavBarNav {
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public class: string;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public style: string;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public id: string;
}
