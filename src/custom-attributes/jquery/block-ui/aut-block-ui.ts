
import { noView, customAttribute, inject, bindable, bindingMode } from 'aurelia-framework';
import './scripts/jquery.blockUI.js';
import * as $ from 'jquery';
import './styles/spinKit.css';
@noView()
@customAttribute('aut-block-ui')
@inject(Element)
export class BlockUI {

  @bindable({ defaultBindingMode: bindingMode.oneWay }) private block: string | boolean = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) private css: any;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) private message: string = null;

  private isBound = false;

  constructor(private element: Element) {
  }

  private bind() {
    this.isBound = true;
  }


  private blockChanged(doBlocking: boolean) {

    console.warn(`blocking: ${doBlocking}`);

    if (doBlocking) {
      $(this.element).block({
        message: this.message,
        css: this.css ? JSON.parse(this.css) : null,
        onBlock: () => console.log('blocked'),
        onUnblock: () => console.log('unblocked')
      });
    } else {
      $(this.element).unblock();
    }
  }
}
