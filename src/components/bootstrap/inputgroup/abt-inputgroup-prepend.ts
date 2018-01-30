import { customElement, inject, bindable, bindingMode, BindingEngine, containerless } from 'aurelia-framework';
@containerless()

@customElement('abt-inputgroup-prepend')
export class BootstrapInputGroupPrependCustomElement {
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public id: string;

}
