import { containerless, customElement } from 'aurelia-framework';
import { bindable } from 'aurelia-templating';
import { bindingMode } from 'aurelia-binding';



@containerless()
@customElement('abt-card-link')
export class BootstrapCardLink {

  @bindable({ defaultBindingMode: bindingMode.oneTime }) public style: string;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public class: string;

  @bindable({ defaultBindingMode: bindingMode.oneTime }) public href: string;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public target: string;

}
