// import { microlink } from 'microlinkjs';
// const microlink = require('microlinkjs');

import { customElement, bindable, bindingMode, inject, containerless } from 'aurelia-framework';

@inject(Element)
@containerless()
@customElement('aut-microlink')
export class MicrolinkCustomElement {
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public rounded: boolean = true;
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public url: string = null;

    private attached() {
        // @ts-ignore
        microlink('a', { rounded: this.rounded });
    }
}
