import { inject, customElement, bindable, bindingMode, containerless } from 'aurelia-framework';



@inject(Element)
@containerless()
@customElement('abt-badge')
export class BootstrapBadge {

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public type: string = 'primary';
  // @bindable({ defaultBindingMode: bindingMode.oneWay }) public href: string | null = null;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public isPill: boolean | string = false;

  constructor(private element: Element) { }

  private bind() {
    const onlyIsPillAttribute = (this.isPill === '' && this.element.hasAttribute('is-pill'));
    this.isPill = onlyIsPillAttribute || this.isPill === 'true' || this.isPill === true;
  }

}
