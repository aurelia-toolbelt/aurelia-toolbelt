import { bindable, bindingMode, containerless, customElement } from 'aurelia-framework';


@containerless()
@customElement('aut-metis-menu-item')
export class JQueryMetisItem {

    @bindable({ defaultBindingMode: bindingMode.oneWay }) public href: string | null = null;

}

