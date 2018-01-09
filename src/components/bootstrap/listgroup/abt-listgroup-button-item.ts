import { inject, customElement, bindingMode, bindable, containerless } from 'aurelia-framework';
import * as $ from 'jquery';

@containerless()
@customElement('abt-listgroup-button-item')
export class ListGroupButtonItemCustomElement {

    @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string = '';
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;

    private listgroupbtnitemtmpl: Element;
    private listgroupbtnitem: Element;

    private attached() {
        let isActive = this.listgroupbtnitemtmpl.hasAttribute('active');
        let isDisabled = this.listgroupbtnitemtmpl.hasAttribute('disabled');
        if (isActive) {
            this.listgroupbtnitem.classList.add('active');
        }
        if (isDisabled) {
            this.listgroupbtnitem.classList.add('disabled');
        }
    }
}
