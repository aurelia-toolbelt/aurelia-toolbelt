import { inject, customElement, bindingMode, bindable, containerless, DOM } from 'aurelia-framework';
import * as $ from 'jquery';


export type ColorType = 'primary' | 'secondary' | 'success' | 'danger'
  | 'warning' | 'info' | 'light' | 'dark';

@containerless()
@customElement('abt-listgroup-item')
export class ListGroupItemCustomElement {
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public id: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public href: string;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public style: string;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public class: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public type: ColorType;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public click: Function;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public active: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public disabled: boolean | string = false;


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

    this.active = Boolean(this.active);
    this.disabled = Boolean(this.disabled);

    let isActive = this.active || this.listGroupItemTmpl.hasAttribute('active');
    let isDisabled = this.disabled || this.listGroupItemTmpl.hasAttribute('disabled');
    if (isActive) {
      this.listGroupItem.classList.add('active');
    }
    if (isDisabled) {
      this.listGroupItem.classList.add('disabled');
    }
    if ((this.href || this.click) && !this.listGroupItem.classList.contains('disabled')) {
      $(this.listGroupItem).removeClass('abt-listgroup-item-disabled');
    } else {
      $(this.listGroupItem).addClass('abt-listgroup-item-disabled');
    }

    if (this.type) {
      this.listGroupItem.classList.add(`list-group-item-${this.type}`);
    }

  }


  private onClick(event: Event) {
    if (this.click) {
      this.click({ event: event });
      return false;
    } else {
      return true;
    }
  }

}
