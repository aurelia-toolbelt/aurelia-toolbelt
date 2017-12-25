import { inject, customAttribute, bindingMode, bindable, customElement } from 'aurelia-framework';


@inject(Element)
@customElement('abt-progress-bar')
export class BootstrapProgressBar {


  @bindable({ defaultBindingMode: bindingMode.oneTime }) public color: string = '';

  private isAnimated: boolean = false;
  private isStriped: boolean = false;


  constructor(private element: Element) { }

  private attached() {
    this.isAnimated = this.element.hasAttribute('animated');
    this.isStriped = this.element.hasAttribute('striped');
  }

}
