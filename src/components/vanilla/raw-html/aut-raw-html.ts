
import { inject, customElement, containerless } from 'aurelia-framework';

@inject(Element)
@customElement('aut-raw-html')
export class RawHtmlRenderer {


  private content: string;
  private renderer: HTMLDivElement;
  private dummy: HTMLDivElement;

  constructor(private element: Element) {
  }

  private attached() {

    this.content = this.dummy.innerHTML.replace('<!--slot-->' , '');
    this.dummy.remove();
  }


}
