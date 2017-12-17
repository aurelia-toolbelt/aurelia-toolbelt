// const microlink = require('microlinkjs');
import { customElement, bindable, bindingMode, inject } from 'aurelia-framework';

@inject(Element)
@customElement('aut-microlink')
export class MicrolinkCustomElement {
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public rounded: boolean = true;
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public url: string = null;

    private attached() {
        document.addEventListener('DOMContentLoaded', function (_event) {
            // microlink('.microlink', { rounded: true });
        });
    }
}
