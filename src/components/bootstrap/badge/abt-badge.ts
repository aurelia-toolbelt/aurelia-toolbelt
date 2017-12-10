import { inject, customElement, bindable, bindingMode, containerless } from 'aurelia-framework';



@inject(Element)
@customElement('abt-badge')
@containerless()
export class BootstraBadge {

    @bindable({ defaultBindingMode: bindingMode.oneTime }) public color: string = 'primary';
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public href: string | null = null;

    private isPill: boolean = false;

    constructor(private element: Element) { }

    private bind() {
        this.isPill = this.element.hasAttribute('pill');
    }

}
