import { containerless, inject, bindable, bindingMode } from 'aurelia-framework';
import { customElement } from 'aurelia-templating';

import * as $ from 'jquery';

@inject(Element)
@customElement('abt-navs')
export class BootstrapNavs {


  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string;


  @bindable({ defaultBindingMode: bindingMode.oneTime }) public bsShow: any;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public bsHide: any;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public bsShown: any;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public bsHidden: any;


  private beTab: boolean = false;
  private filled: boolean = false;
  private bePills: boolean = false;
  private justified: boolean = false;
  private beVertical: boolean = false;

  constructor(private element: Element) {
  }

  private afterAttached() {

    this.beTab = this.element.hasAttribute('tabs');
    this.filled = this.element.hasAttribute('fill');
    this.bePills = this.element.hasAttribute('pills');
    this.justified = this.element.hasAttribute('justified');
    this.beVertical = this.element.hasAttribute('vertical');

    if (this.justified && this.filled) {
      let error = new Error(`The [abt-navs] should have either 'fill' or 'justified' attributes, and not both of them simultaneously.`);
      throw error;
    }

    let children = this.element.children.item(0).getElementsByTagName('a');
    $(children).tab();
    this.handle_events();

  }



  private handle_events() {
    // all a tags which are going  meant to be tabs/pills
    let children = this.element.children.item(0).getElementsByTagName('a');

    if (this.bsShow) {
      $(children).on('show.bs.tab', (event: any) => {
        if (this.bsShow) {
          this.bsShow({ activeTab: event.target, prevTab: event.relatedTarget });
        }
      });
    }

    if (this.bsShown) {
      $(children).on('shown.bs.tab', (event: any) => {
        if (this.bsShown) {
          this.bsShown({ activeTab: event.target, prevTab: event.relatedTarget });
        }
      });
    }


    if (this.bsHide) {
      $(children).on('hide.bs.tab', (event: any) => {
        if (this.bsHide) {
          this.bsHide({ activeTab: event.target, prevTab: event.relatedTarget });
        }
      });
    }

    if (this.bsHidden) {
      $(children).on('hidden.bs.tab', (event: any) => {
        if (this.bsHidden) {
          this.bsHidden({ activeTab: event.target, prevTab: event.relatedTarget });
        }
      });
    }

  }

  private detached() {
    let children = this.element.children.item(0).getElementsByTagName('a');
    $(children).off('show.bs.tab');
    $(children).off('shown.bs.tab');
    $(children).off('hide.bs.tab');
    $(children).off('hidden.bs.tab');
    $(children).tab('dispose');
  }
}
