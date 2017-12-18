import { customElement, inject, bindable, bindingMode, observable, DOM } from 'aurelia-framework';
import * as $ from 'jquery';

@customElement('aut-img-lazy')
export class JQueryLazy {

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public url: string;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public beforeLoad: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public afterLoad: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public onError: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public onFinishedAll: Function;





}
