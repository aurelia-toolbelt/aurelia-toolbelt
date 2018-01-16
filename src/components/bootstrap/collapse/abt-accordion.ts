import { containerless, customElement, bindable, bindingMode } from 'aurelia-framework';



@containerless()
@customElement('abt-accordion')
export class BootstrapAccordion {


  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string = '';


}
