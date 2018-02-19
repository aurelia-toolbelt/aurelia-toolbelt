import { SharedIndex } from './../../../utilities/vanilla/sharedIndex';

import { customElement, bindable, bindingMode, inject, containerless, DOM } from 'aurelia-framework';

@customElement('aut-divider')
@inject(Element, SharedIndex)
@containerless()
export class DividerCustomElement {

  @bindable({ defaultBindingMode: bindingMode.oneTime }) public id: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public vertical: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public color: string = '#b5b5b5';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public backgroundColor: string = '#fff';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public lineColor: string = '#dbdbdb';


  private divider: HTMLDivElement;

  constructor(private element: Element, private sharedIndex: SharedIndex) {
  }

  private attached() {

    this.vertical = (this.vertical === '' && this.element.hasAttribute('vertical')) || this.vertical.toString() === 'true';

    let value = this.divider.innerText;
    this.divider.innerText = '';
    this.divider.setAttribute('data-content', value);

    let css = `.is-divider-vertical[data-content]::after,.is-divider[data-content]::after{
      background:${this.backgroundColor}!important;color:${this.color}!important}
      .is-divider{border-top:.1rem solid ${this.lineColor}!important;}
      .is-divider-vertical::before{border-left:.1rem solid ${this.lineColor}!important;}
      `;
    DOM.injectStyles(css, null, null, 'aut_divider_injected_style');
  }
}
