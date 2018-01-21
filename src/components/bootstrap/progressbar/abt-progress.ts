import { inject, customAttribute, bindingMode, bindable, customElement, DOM, containerless } from 'aurelia-framework';

@containerless()
@customElement('abt-progress')
export class BootstrapProgress {

  @bindable({ defaultBindingMode: bindingMode.oneTime }) public color: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public style: string = '';

}
