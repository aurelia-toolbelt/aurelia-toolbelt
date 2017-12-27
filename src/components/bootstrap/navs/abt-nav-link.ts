import { containerless, bindable, bindingMode, inject, customElement } from 'aurelia-framework';



@inject(Element)
@containerless()
@customElement('abt-nav-link')
export class BootstrapNavLink {


    @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string;

    @bindable({ defaultBindingMode: bindingMode.oneWay }) public href: string;

    @bindable({ defaultBindingMode: bindingMode.twoWay }) public selected: boolean | string | null;


    private isActive: boolean = false;
    private isDisabled: boolean = false;

    private item: HTMLAnchorElement;

    constructor(private element: Element) { }


    private attached() {

        this.selected = this.selected !== null ? Boolean(this.selected) : null;

        this.isActive = this.selected !== null ? this.selected : this.element.hasAttribute('active');
        this.isDisabled = this.element.hasAttribute('disabled');

        if (this.selected != null) {
            /** We should add attributes to the 'previousElementSibling' sice the component is containerless */
            this.item.setAttribute('aria-selected', this.selected.toString());
            this.item.setAttribute('data-toggle',
                this.element.parentElement.hasAttribute('tabs')
                    ? 'tab'
                    : this.element.parentElement.hasAttribute('pill')
                        ? 'pill'
                        : '');
            this.item.setAttribute('role', 'tab');
        }

    }

}
