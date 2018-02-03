import { containerless, customElement } from 'aurelia-framework';
import { bindable } from 'aurelia-templating';
import { bindingMode } from 'aurelia-binding';



@containerless()
@customElement('abt-card-body')
export class BootstrapCardBody {

  @bindable({ defaultBindingMode: bindingMode.oneTime }) public style: string;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public class: string;

}
