import { inject, customElement, bindingMode, bindable, containerless, DOM } from 'aurelia-framework';
import * as $ from 'jquery';

@containerless()
@customElement('abt-listgroup-item')
export class ListGroupItemCustomElement {

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public href: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public color: string;

  @bindable({ defaultBindingMode: bindingMode.twoWay }) public click: Function;

  private listGroupItemTmpl: Element;
  private listGroupItem: HTMLLinkElement;

  constructor() {
    DOM.injectStyles(`
            a.abt-listgroup-item-disabled {
                pointer-events: none !important;
            }
    `);
  }

  private attached() {
    let isActive = this.listGroupItemTmpl.hasAttribute('active');
    let isDisabled = this.listGroupItemTmpl.hasAttribute('disabled');
    if (isActive) {
      this.listGroupItem.classList.add('active');
    }
    if (isDisabled) {
      this.listGroupItem.classList.add('disabled');
    }
    if (this.href || this.click) {
      $(this.listGroupItem).removeClass('abt-listgroup-item-disabled');
    } else {
      $(this.listGroupItem).addClass('abt-listgroup-item-disabled');
    }
  }


  private onClick(event: Event) {

    event.preventDefault();

    if (this.click) {
      this.click({ event: event });
    }

  }

}
