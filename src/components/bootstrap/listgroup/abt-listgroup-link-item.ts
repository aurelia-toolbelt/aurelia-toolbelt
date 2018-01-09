import { inject, customElement, bindingMode, bindable, containerless } from 'aurelia-framework';
import * as $ from 'jquery';

@containerless()
@customElement('abt-listgroup-link-item')
export class ListGroupLinkItemCustomElement {

    @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string = '';
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public href: string;

    private listgrouplinkitemtmpl: Element;
    private listgrouplinkitem: Element;

    private attached() {
        let isActive = this.listgrouplinkitemtmpl.hasAttribute('active');
        let isDisabled = this.listgrouplinkitemtmpl.hasAttribute('disabled');
        if (isActive) {
            this.listgrouplinkitem.classList.add('active');
        }
        if (isDisabled) {
            this.listgrouplinkitem.classList.add('disabled');
        }
    }
}
