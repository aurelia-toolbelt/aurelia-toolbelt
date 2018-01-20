import { DOM, containerless, inject, bindingMode, bindable } from 'aurelia-framework';
import { customElement } from 'aurelia-templating';


export type Placement = 'append' | 'prepend';

@containerless()
@customElement('abt-navbar-text')
export class BootstrapNavBarText {
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string;
}
