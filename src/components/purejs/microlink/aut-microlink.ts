
const microlink = require('./scripts/microlink');

import { customElement, bindable, bindingMode, inject } from 'aurelia-framework';

@inject(Element)
@customElement('aut-microlink')
export class MicrolinkCustomElement {

  @bindable({ defaultBindingMode: bindingMode.oneTime }) public class: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public round: boolean = true;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public url: string = null;

  private microlink: HTMLAnchorElement;
  constructor(private element: Element) {

  }

  private generateUniqueId(): string {
    let auTargetId = '_' + this.element.attributes.getNamedItem('au-target-id').value;
    let auTargetIdChild = '_' + this.microlink.attributes.getNamedItem('au-target-id').value;
    let id = auTargetId + auTargetIdChild;
    return id;
  }

  private attached() {
    let id = this.generateUniqueId();
    this.microlink.setAttribute('id', id);
    microlink(`#${id}`, { round: this.round });
  }
}
