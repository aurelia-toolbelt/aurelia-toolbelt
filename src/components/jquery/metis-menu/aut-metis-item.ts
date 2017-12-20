import { inject, customElement, bindable, bindingMode, containerless } from 'aurelia-framework';




@inject(Element)
// @containerless()
@customElement('aut-metis-item')

export class JQueryMetisItem {

    @bindable({ defaultBindingMode: bindingMode.oneWay }) public text: string;

    @bindable({ defaultBindingMode: bindingMode.oneTime }) public itemClass: string;
    @bindable({ defaultBindingMode: bindingMode.oneTime }) public iconClass: string;
    @bindable({ defaultBindingMode: bindingMode.oneTime }) public arrowClass: string = ' fa arrow';

    @bindable({ defaultBindingMode: bindingMode.oneTime }) public expanded: string | boolean;

    private isActive: boolean = false;

    constructor(private element: Element) {
    }


    private attached() {

        this.isActive = this.element.hasAttribute('active');
        this.expanded = this.expanded === true
            || this.expanded === 'true'
            || ((this.expanded === undefined || this.expanded == null) && this.element.hasAttribute('expanded'));
    }

    private created() {
        console.log('item');
    }

}
