import { bindable, bindingMode, containerless, customElement } from 'aurelia-framework';


@containerless()
@customElement('abt-scrollspy-item')
export class BootstrapScrollspyItem {


  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string;


  @bindable({ defaultBindingMode: bindingMode.oneTime }) public id: string;

}
