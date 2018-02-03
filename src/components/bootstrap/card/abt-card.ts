import { containerless, customElement, bindable } from 'aurelia-framework';
import { bindingMode } from 'aurelia-binding';



@customElement('abt-card')
@containerless()
export class BootstrapCard {


  @bindable({ defaultBindingMode: bindingMode.oneTime }) public style: string;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public class: string;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public width: string;

}
