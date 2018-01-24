import { inject, customElement, bindingMode, bindable, containerless } from 'aurelia-framework';
import * as $ from 'jquery';

@containerless()
@customElement('abt-listgroup')
export class ListGroupCustomElement {
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public id: string;

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;
}
