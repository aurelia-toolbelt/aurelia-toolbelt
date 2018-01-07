import { containerless, customElement } from 'aurelia-framework';
import { inject } from 'aurelia-dependency-injection';



@inject(Element)
@containerless()
@customElement('abt-jumbotron')
export class BootstrapJumbotron {


  private isFluid: boolean = false;
  constructor(private element: Element) {
  }


  private attached() {
    this.isFluid = this.element.hasAttribute('fluid');
  }

}
