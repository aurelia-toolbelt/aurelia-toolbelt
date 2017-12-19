
const microlink = require('./scripts/microlink');

import { customElement, bindable, bindingMode, inject } from 'aurelia-framework';

@inject(Element)
@customElement('aut-microlink')
export class MicrolinkCustomElement {
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public rounded: boolean = true;
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public url: string = null;

    constructor(private element: Element) {

    }
    private attached() {
        microlink('a.micro-link', { rounded: this.rounded });
    }
}
