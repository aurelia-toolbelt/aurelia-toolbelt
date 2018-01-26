import { inject, containerless, customElement, bindable, bindingMode } from 'aurelia-framework';




@inject(Element)
@containerless()
@customElement('abt-alert-link')
export class BootstrapAlertLink {

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public href: string = '';
  // @bindable({ defaultBindingMode: bindingMode.oneWay }) public routeHref: any;

  @bindable({ defaultBindingMode: bindingMode.twoWay }) public disabled: boolean | string;

  constructor(private element: Element) { }

}
