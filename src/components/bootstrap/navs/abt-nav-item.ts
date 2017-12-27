import { containerless, bindable, bindingMode, inject, customElement } from 'aurelia-framework';



@inject(Element)
@containerless()
@customElement('abt-nav-item')
export class BootstrapNavLink {


    @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string;
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public href: string;
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public title: string;

    @bindable({ defaultBindingMode: bindingMode.twoWay }) public selected: boolean | string | null = null;

    private isActive: boolean = false;
    private isDisabled: boolean = false;

    private tab_header: HTMLAnchorElement;
    private tab_body: HTMLDivElement;


    private element: HTMLElement;

    constructor(element: Element) {

        this.element = <HTMLElement>element;

    }

    private attached() {


        let tab_daddy: HTMLElement;
        let tab_grandPa: HTMLElement;

        let isTheFirstChild: boolean = this.tab_header.parentElement.children.item(0) === this.tab_header;

        this.selected = this.selected !== null ? Boolean(this.selected) : null;

        this.isActive = this.selected !== null ? this.selected : this.element.hasAttribute('active');
        this.isDisabled = this.element.hasAttribute('disabled');

        tab_daddy = this.tab_header.parentElement;
        tab_grandPa = <HTMLElement>tab_daddy.parentElement.children.item(1);

        tab_daddy.removeChild(this.tab_body);

        let id = this.element.hasAttribute('id') ? this.element.getAttribute('id') : -1;
        // if the slot part is empty then do not add tab_body to grandPa :wink:
        if (id !== -1 && this.tab_body.textContent.length > 8) {

            let tab_body_id = `${id}-tab-body`;

            /** generate attributes for the <a> element if it contains any body */
            // if (this.selected != null || isTheFirstChild) {

            this.selected = isTheFirstChild;

            let data_toggle = tab_daddy.parentElement.hasAttribute('tabs')
                ? 'tab'
                : tab_daddy.parentElement.hasAttribute('pills')
                    ? 'pill'
                    : '';

            this.tab_header.setAttribute('data-toggle', data_toggle);

            this.tab_header.setAttribute('role', 'tab');
            this.tab_header.setAttribute('aria-controls', `${tab_body_id}`);
            this.tab_header.setAttribute('aria-selected', `${this.selected || isTheFirstChild}`);
            // }

            this.tab_header.setAttribute('href', `#${tab_body_id}`);

            /** generate attributes for tab-content */
            this.tab_body.setAttribute('id', `${tab_body_id}`);
            this.tab_body.setAttribute('aria-labelledby', `${id}`);
            // this.tab_body.setAttribute('role', `tabpanel`);

            tab_grandPa.appendChild(this.tab_body);

        }

    }

}
