import { containerless, inject, bindable, bindingMode } from 'aurelia-framework';
import { customElement } from 'aurelia-templating';


@inject(Element)
@containerless()
@customElement('abt-navs')
export class BootstrapNavs {


    @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string;


    private beTab: boolean = false;
    private filled: boolean = false;
    private bePills: boolean = false;
    private justified: boolean = false;
    private beVertical: boolean = false;

    constructor(private element: Element) {
    }

    private attached() {

        this.beTab = this.element.hasAttribute('tabs');
        this.filled = this.element.hasAttribute('fill');
        this.bePills = this.element.hasAttribute('pills');
        this.justified = this.element.hasAttribute('justified');
        this.beVertical = this.element.hasAttribute('vertical');

        if (this.justified && this.filled) {
            let error = new Error(`The [abt-navs] should have either 'fill' or 'justified' attributes, and not both of them simultaneously.`);
            throw error;
        }

    }
}
