import { customElement, inject, bindable, bindingMode, BindingEngine, containerless } from 'aurelia-framework';

@containerless()
@customElement('abt-tokenize-item')
export class BootstrapTokenizeItemCustomElement {

    @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string;
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public value: string;
}
