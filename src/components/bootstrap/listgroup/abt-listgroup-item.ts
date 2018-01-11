import { inject, customElement, bindingMode, bindable, containerless, DOM } from 'aurelia-framework';
import * as $ from 'jquery';

@containerless()
@customElement('abt-listgroup-item')
export class ListGroupItemCustomElement {

    @bindable({ defaultBindingMode: bindingMode.oneWay }) public href: string;

    @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string = '';
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;

    private listgroupitemtmpl: Element;
    private listgroupitem: HTMLLinkElement;

    constructor() {
        DOM.injectStyles(`
            a.abt-listgroup-item-disabled {
                pointer-events: none !important;
                cursor: default !important;
            }
    `);
    }

    private attached() {
        let isActive = this.listgroupitemtmpl.hasAttribute('active');
        let isDisabled = this.listgroupitemtmpl.hasAttribute('disabled');
        if (isActive) {
            this.listgroupitem.classList.add('active');
        }
        if (isDisabled) {
            this.listgroupitem.classList.add('disabled');
        }
        if (this.href) {
            $(this.listgroupitem).removeClass('abt-listgroup-item-disabled');
        } else {
            $(this.listgroupitem).addClass('abt-listgroup-item-disabled');

        }
    }
}
