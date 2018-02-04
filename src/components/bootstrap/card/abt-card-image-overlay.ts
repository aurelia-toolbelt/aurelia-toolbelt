import { containerless, customElement } from 'aurelia-framework';
import { bindable } from 'aurelia-templating';
import { bindingMode } from 'aurelia-binding';



@containerless()
@customElement('abt-card-image-overlay')
export class BootstrapCardImageOverlay {

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;

}
