import { inject, customElement, bindable, bindingMode, containerless } from 'aurelia-framework';




@inject(Element)
@containerless()
@customElement('aut-metis-menu-group')

export class JQueryMetisGroup {

    @bindable({ defaultBindingMode: bindingMode.oneWay }) public text: string;

    @bindable({ defaultBindingMode: bindingMode.oneTime }) public groupClass: string = '';
    @bindable({ defaultBindingMode: bindingMode.oneTime }) public iconClass: string = '';
    @bindable({ defaultBindingMode: bindingMode.oneTime }) public arrowClass: string = ' fa arrow';

    @bindable({ defaultBindingMode: bindingMode.oneTime }) public active: string | boolean = false;
    @bindable({ defaultBindingMode: bindingMode.oneTime }) public showArrow: string | boolean = true;



    constructor(private element: Element) {}

    private attached() {

        this.active = this.active === true
            || this.active === 'true'
            || ((this.active === undefined || this.active == null) && this.element.hasAttribute('active'));

        this.showArrow = this.showArrow === true
            || this.showArrow === 'true'
            || ((this.showArrow === undefined || this.showArrow == null) && this.element.hasAttribute('showArrow'));
    }
}
