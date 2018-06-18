import { bindingMode, bindable, containerless, customElement, inject } from 'aurelia-framework';


@containerless()
@customElement('abt-modal-title')
export class BootstrapModalTitle {


  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string = '';

}
