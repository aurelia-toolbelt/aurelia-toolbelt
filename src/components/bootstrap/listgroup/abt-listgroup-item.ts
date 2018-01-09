import { inject, customElement, bindingMode, bindable, containerless } from 'aurelia-framework';
import * as $ from 'jquery';

@containerless()
@customElement('abt-listgroup-item')
export class ListGroupItemCustomElement {

    @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string = '';
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;

    private listgroupitemtmpl: Element;
    private listgroupitem: Element;

    private attached() {
        let isActive = this.listgroupitemtmpl.hasAttribute('active');
        let isDisabled = this.listgroupitemtmpl.hasAttribute('disabled');
        if (isActive) {
            this.listgroupitem.classList.add('active');
        }
        if (isDisabled) {
            this.listgroupitem.classList.add('disabled');
        }
    }
}
