import { inject, customElement, bindable, bindingMode, containerless } from 'aurelia-framework';




@inject(Element)
@containerless()
@customElement('abt-button-group')
export class BootstrapButtonGroup {


  @bindable({ defaultBindingMode: bindingMode.oneTime }) public label: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public size: string = 'md';

  private isVertical: boolean = false;

  constructor(private element: Element) {

  }

  private attached() {
    this.isVertical = this.element.hasAttribute('vertical');
  }

}
