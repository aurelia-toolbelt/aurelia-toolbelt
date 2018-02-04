import { containerless, customElement, bindable } from 'aurelia-framework';
import { bindingMode } from 'aurelia-binding';



@customElement('abt-card')
@containerless()
export class BootstrapCard {


  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public width: string;

}
