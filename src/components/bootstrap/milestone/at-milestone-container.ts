import { useShadowDOM, customElement, containerless, bindable, bindingMode, inject } from 'aurelia-framework';


@inject(Element)
@containerless()
@customElement('at-milestone-container')
export class AureliaToolbeltMilestoneContainer {

  @bindable({ defaultBindingMode: bindingMode.oneTime }) public topBorder: boolean | string = true;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public bottomBorder: boolean | string = true;

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string = '';

  constructor(private element: Element) { }


  public attached() {

    const onlyTopBorderAttribute = (this.topBorder === '' && this.element.hasAttribute('top-border'));
    this.topBorder = onlyTopBorderAttribute || this.topBorder === 'true' || this.topBorder === true;

    const onlyBottomBorderAttribute = (this.bottomBorder === '' && this.element.hasAttribute('bottom-border'));
    this.bottomBorder = onlyBottomBorderAttribute || this.bottomBorder === 'true' || this.bottomBorder === true;

  }

}
