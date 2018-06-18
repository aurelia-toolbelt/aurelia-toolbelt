import { inject, containerless, customElement, bindable, bindingMode } from 'aurelia-framework';




@inject(Element)
@containerless()
@customElement('abt-alert-link')
export class BootstrapAlertLink {
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public id: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public href: string = '';
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public disabled: boolean | string = false;
}
