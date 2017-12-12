import { inject, customElement, bindable, bindingMode, containerless } from 'aurelia-framework';




@inject(Element)
@containerless()
@customElement('abt-toolbar')
export class BootstrapToolbar {


  @bindable({ defaultBindingMode: bindingMode.oneTime }) public label: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public class: string = '';

  constructor(private element: Element) {

  }

}
