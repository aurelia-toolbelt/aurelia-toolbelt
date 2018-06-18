

import { containerless, customElement, bindable, bindingMode, inject } from 'aurelia-framework';


@inject(Element)
@containerless()
@customElement('abt-accordion-item')
export class BootstrapAccordionItem {

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string = '';

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public title: string = '';

  @bindable({ defaultBindingMode: bindingMode.oneTime }) public active: boolean = false;

  private collapse: HTMLElement;

  constructor(private element: Element) {
  }

  private onAnchorClick(event: Event) {
    event.preventDefault();
    return false;
  }

}
