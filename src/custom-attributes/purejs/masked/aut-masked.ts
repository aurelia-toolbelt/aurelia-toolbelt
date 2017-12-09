import { customAttribute, bindingMode, bindable } from 'aurelia-framework';
import { inject } from 'aurelia-dependency-injection';

const InputMask = require('inputmask');

@inject(Element)
@customAttribute('aut-masked')
export class MaskedInputCustomAttribute {


    @bindable({ defaultBindingMode: bindingMode.oneTime, primaryProperty: true }) public mask: String;
    @bindable({ defaultBindingMode: bindingMode.oneTime }) public regex: String | RegExp;

    constructor(private element: Element) {
    }


    private maskChanged(newMask: String) {
        let im = new InputMask(newMask);
        im.mask(this.element);
    }

    private regexChanged(newRegex: String | RegExp) {
        let im = new InputMask({ regex: newRegex });
        im.mask(this.element);
    }

}
