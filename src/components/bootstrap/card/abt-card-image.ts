import { containerless, customElement, bindable, bindingMode } from 'aurelia-framework';


@containerless()
@customElement('abt-card-image')
export class BootstrapCardImage {


    @bindable({ defaultBindingMode: bindingMode.oneTime }) public alt: string;
    @bindable({ defaultBindingMode: bindingMode.oneTime }) public style: string;
    @bindable({ defaultBindingMode: bindingMode.oneTime }) public class: string;

    @bindable({ defaultBindingMode: bindingMode.oneWay }) public src: string;

}
