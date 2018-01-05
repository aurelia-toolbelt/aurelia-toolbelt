import { customElement, inject, bindable, bindingMode, BindingEngine, containerless } from 'aurelia-framework';

export type PlacementType = 'auto' | 'top' | 'bottom' | 'left' | 'right';
export type BoundaryType = 'viewport' | 'window' | 'scrollParent';

import * as $ from 'jquery';

@containerless()
@inject(Element)
@customElement('abt-tooltip')
export class BootstrapTooltipCustomElement {

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public container: string | boolean = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public delay: number | object;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public placement: PlacementType | Function = 'top';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public selector: string | boolean = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public animation: boolean = true;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public html: boolean = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public trigger: string = 'hover focus';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public offset: string | number = 0;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public fallbackPlacement: string | string[] = 'flip';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public boundary: BoundaryType = 'scrollParent';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public template: string =
    '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>';

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public show: Function;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public shown: Function;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public hide: Function;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public hidden: Function;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public inserted: Function;

  private tooltip: Element;
  private parentElement: HTMLElement;

  constructor(private element: Element) {

  }

  private attached() {
    this.parentElement = this.element.parentElement;
    let slotContent = this.html ? this.tooltip.innerHTML : this.tooltip.textContent;
    // @ts-ignore
    $(this.parentElement).tooltip({
      'title': slotContent,
      'html': this.html,
      'template': this.template,
      'animation': this.animation,
      'placement': this.placement,
      'container': this.container,
      'delay': this.delay,
      'trigger': this.trigger,
      'offset': this.offset,
      'fallbackPlacement': this.fallbackPlacement,
      'boundary': this.boundary
    });
    this.tooltip.remove();
    if (this.show) {
      $(this.parentElement).on('show.bs.tooltip', this.show());
    }

    if (this.shown) {
      $(this.parentElement).on('shown.bs.tooltip', this.shown());
    }

    if (this.hide) {
      $(this.parentElement).on('hide.bs.tooltip', this.hide());
    }

    if (this.hidden) {
      $(this.parentElement).on('hidden.bs.tooltip', this.hidden());
    }

    if (this.inserted) {
      $(this.parentElement).on('inserted.bs.tooltip', this.inserted());
    }
  }


  private detached() {
    $(this.parentElement).tooltip('dispose');
  }

}
