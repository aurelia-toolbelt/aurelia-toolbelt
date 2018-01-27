import { inject, customAttribute, bindingMode, bindable, customElement, DOM, containerless } from 'aurelia-framework';

@customElement('abt-progress')
export class BootstrapProgress {
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public id: string;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public class: string;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public style: string;

}
