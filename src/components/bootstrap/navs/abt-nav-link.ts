import { containerless, bindable, bindingMode, inject, customElement } from 'aurelia-framework';



@inject(Element)
@containerless()
@customElement('abt-nav-link')
export class BootstrapNavLink {


    @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string;

    @bindable({ defaultBindingMode: bindingMode.oneWay }) public href: string;


    private isActive: boolean = false;
    private isDisabled: boolean = false;

    constructor(private element: Element) { }


    private attached() {
        this.isActive = this.element.hasAttribute( 'active' );
        this.isDisabled = this.element.hasAttribute( 'disabled' );
    }

}
