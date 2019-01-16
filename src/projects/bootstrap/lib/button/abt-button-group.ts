import { inject, customElement, bindable, bindingMode, containerless } from 'aurelia-framework';

@inject(Element)
@containerless()
@customElement('at-button-group')
export class AtButtonGroup {

  @bindable({ defaultBindingMode: bindingMode.oneTime }) public id: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public label: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public size: string = 'md';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string = '';

  @bindable({ defaultBindingMode: bindingMode.oneTime }) public toggle: boolean | string = false;

  @bindable({ defaultBindingMode: bindingMode.oneTime }) public vertical: boolean | string = false;

  constructor(private element: Element) { }

  private attached() {
    const onlyVerticalAttribute = (this.vertical === '' && this.element.hasAttribute('vertical'));
    this.vertical = onlyVerticalAttribute || this.vertical === 'true' || this.vertical === true;

    const onlyisToggleAttribute = (this.toggle === '' && this.element.hasAttribute('toggle'));
    this.toggle = onlyisToggleAttribute || this.toggle === 'true' || this.toggle === true;
  }

}
