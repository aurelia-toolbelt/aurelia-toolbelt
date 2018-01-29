import { DOM, containerless, inject, bindingMode, bindable } from 'aurelia-framework';
import { customElement } from 'aurelia-templating';

@containerless()
@customElement('abt-navbar-text')
export class BootstrapNavBarText {
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public class: string;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public style: string;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public id: string;

}
