import { customElement, inject, containerless, bindable, bindingMode } from 'aurelia-framework';


@inject(Element)
@containerless()
@customElement('abt-link-button')
export class BootstrapLinkButton {

    @bindable({ defaultBindingMode: bindingMode.oneTime }) public color: string = 'primary';
    @bindable({ defaultBindingMode: bindingMode.oneTime }) public size: string = 'md';
    @bindable({ defaultBindingMode: bindingMode.oneTime }) public type: string = 'button';

    @bindable({ defaultBindingMode: bindingMode.oneWay }) public href: string = '';

    @bindable({ defaultBindingMode: bindingMode.twoWay }) public disabled: boolean | string;

    private isOutlined: boolean = false;
    private isBlockLevel: boolean = false;

    constructor(private element: Element) { }

    private bind() {
        this.isOutlined = this.element.hasAttribute('outline');
        this.isBlockLevel = this.element.hasAttribute('block');
    }

}
