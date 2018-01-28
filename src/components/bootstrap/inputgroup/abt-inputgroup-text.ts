import { customElement, inject, bindable, bindingMode, BindingEngine, containerless } from 'aurelia-framework';
@containerless()

@customElement('abt-inputgroup-text')
export class BootstrapInputGroupTextCustomElement {
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public class: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public style: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public id: string;

}
