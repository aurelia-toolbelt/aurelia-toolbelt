
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
  @bindable({ defaultBindingMode: bindingMode.oneWay }) private message: string;

  private isBound = false;

  constructor(private element: Element) {
  }

  private bind() {
    this.isBound = true;
  }


  private blockChanged(doBlocking: boolean) {
    if (doBlocking) {
      $(this.element).block({
        message: this.message,
        css: JSON.parse(this.css),
        onBlock: () => console.log('blocked'),
        onUnblock: () => console.log('unblocked')
      });
    } else {
      $(this.element).unblock();
    }
  }
}
