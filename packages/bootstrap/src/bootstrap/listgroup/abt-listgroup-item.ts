import { inject, customElement, bindingMode, bindable, containerless, DOM } from 'aurelia-framework';
import * as $ from 'jquery';


export type ColorType = 'primary' | 'secondary' | 'success' | 'danger'
  | 'warning' | 'info' | 'light' | 'dark';

@containerless()
@customElement('abt-listgroup-item')
export class ListGroupItemCustomElement {
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public id: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public href: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public type: ColorType;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public click: Function;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public active: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public disabled: boolean | string = false;


  private listGroupItemTemplate: Element;
  private listGroupItem: HTMLLinkElement;

  private attached() {

    let isActive = (this.active === '' && this.listGroupItemTemplate.hasAttribute('active')) || this.active.toString() === 'true';
    let isDisabled = (this.disabled === '' && this.listGroupItemTemplate.hasAttribute('disabled')) || this.disabled.toString() === 'true';

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
