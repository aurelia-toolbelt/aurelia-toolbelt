import { useShadowDOM, customElement, containerless, bindable, bindingMode } from 'aurelia-framework';


@containerless()
@customElement('at-milestone-container')
export class AureliaToolbeltMilestoneContainer {

  @bindable({ defaultBindingMode: bindingMode.oneTime }) public topBorder: boolean = true;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public bottomBorder: boolean = true;

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string = '';


  public attached() {

    const onlyTopBorderAttribute = (this.topBorder == '' && this.element.hasAttribute('top-border'));
    this.topBorder = onlyTopBorderAttribute || this.topBorder == 'true' || this.topBorder == true;

    const onlyBottomBorderAttribute = (this.bottomBorder == '' && this.element.hasAttribute('bottom-border'));
    this.bottomBorder = onlyBottomBorderAttribute || this.bottomBorder == 'true' || this.bottomBorder == true;

  }

}
