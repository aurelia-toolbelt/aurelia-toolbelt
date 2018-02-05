
const microlink = require('aureliatoolbelt-thirdparty/microlink/microlink.js');

import { customElement, bindable, bindingMode, inject } from 'aurelia-framework';

@inject(Element)
@customElement('aut-micro-link')
export class MicrolinkCustomElement {

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public round: boolean = true;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public url: string = null;

  private microlink: HTMLAnchorElement;

  private afterAttached() {
    microlink(`#${this.microlink.id}`, { round: this.round });
  }
}
