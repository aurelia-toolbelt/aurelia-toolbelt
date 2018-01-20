import { customElement, inject, bindable, bindingMode, BindingEngine, containerless } from 'aurelia-framework';

@containerless()
@inject(Element)
@customElement('abt-inputgroup-append')
export class BootstrapInputGroupAppendCustomElement {
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string = '';
}

