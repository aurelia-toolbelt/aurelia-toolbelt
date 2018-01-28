import { inject, customElement, bindable, bindingMode, containerless } from 'aurelia-framework';




@inject(Element)
@containerless()
@customElement('abt-button-group')
export class BootstrapButtonGroup {

  @bindable({ defaultBindingMode: bindingMode.oneTime }) public id: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public label: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public size: string = 'md';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string = '';

  @bindable({ defaultBindingMode: bindingMode.oneTime }) public vertical: boolean | string = false;

  constructor(private element: Element) {

  }

  private afterAttached() {
    const onlyVerticalAttribute = (this.vertical === '' && this.element.hasAttribute('vertical'));
    this.vertical = onlyVerticalAttribute || this.vertical === 'true' || this.vertical === true;
  }

}
