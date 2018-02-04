import { containerless, inject, bindable, bindingMode } from 'aurelia-framework';
import { customElement } from 'aurelia-templating';

import * as $ from 'jquery';

@inject(Element)
@customElement('abt-navs')
export class BootstrapNavs {


  @bindable({ defaultBindingMode: bindingMode.oneWay }) public navsVerticalClass: string = 'col-sm-3';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public contentVerticalClass: string = 'col-sm-9';

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public navsClass: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public navsStyle: string;

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public contentClass: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public contentStyle: string;


  @bindable({ defaultBindingMode: bindingMode.oneTime }) public bsShow: Function;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public bsHide: Function;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public bsShown: Function;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public bsHidden: Function;


  @bindable({ defaultBindingMode: bindingMode.oneTime }) public tabs: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public pills: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public vertical: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public justify: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public fill: boolean | string = false;

  private beTab: boolean = true;
  private bePills: boolean = false;

  constructor(private element: Element) { }

  private afterAttached() {

    const onlyPillsAttribute = (this.pills === '' && this.element.hasAttribute('pills'));
    this.pills = onlyPillsAttribute || this.pills.toString() === 'true';

    const onlyTabsAttribute = (this.tabs === '' && this.element.hasAttribute('tabs'));
    this.tabs = onlyTabsAttribute || this.tabs.toString() === 'true';

    const onlyVerticalAttribute = (this.vertical === '' && this.element.hasAttribute('vertical'));
    this.vertical = onlyVerticalAttribute || this.vertical.toString() === 'true';

    const onlyJustifiedAttribute = (this.justify === '' && this.element.hasAttribute('justify'));
    this.justify = onlyJustifiedAttribute || this.justify.toString() === 'true';

    const onlyFillAttribute = (this.fill === '' && this.element.hasAttribute('fill'));
    this.fill = onlyFillAttribute || this.fill.toString() === 'true';


    this.beTab = this.tabs;
    this.bePills = this.pills;


    if (this.justify && this.fill) {
      let error = new Error(`The [abt-navs] should have either 'fill' or 'justify' attributes, and not both of them simultaneously.`);
      throw error;
    }

    let children = this.element.children.item(0).children.item(0).getElementsByTagName('a');
    $(children).tab();
    this.handle_events();

  }


  private handle_events() {
    // all a tags which are going to be tabs/pills
    let children = this.element.children.item(0).children.item(0).getElementsByTagName('a');

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
    let children = this.element.children.item(0).children.item(0).getElementsByTagName('a');
    $(children).off('show.bs.tab');
    $(children).off('shown.bs.tab');
    $(children).off('hide.bs.tab');
    $(children).off('hidden.bs.tab');
    $(children).tab('dispose');
  }
}
