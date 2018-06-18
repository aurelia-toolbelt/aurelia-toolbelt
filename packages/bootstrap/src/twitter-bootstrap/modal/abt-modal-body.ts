import { bindingMode, bindable, containerless, customElement, inject } from 'aurelia-framework';


@containerless()
@customElement('abt-modal-body')
export class BootstrapModalBody {
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string = '';

}
