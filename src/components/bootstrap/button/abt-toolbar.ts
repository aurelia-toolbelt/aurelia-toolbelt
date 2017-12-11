import { inject, customElement, bindable, bindingMode } from 'aurelia-framework';




@inject(Element)
@customElement('abt-toolbar')
export class BootstrapToolbar {


  @bindable({ defaultBindingMode: bindingMode.oneTime }) public label: string = '';

  constructor(private element: Element) {

  }

}
