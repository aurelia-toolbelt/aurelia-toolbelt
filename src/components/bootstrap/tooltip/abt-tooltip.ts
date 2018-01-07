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

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public showTooltip: Function;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public tooltipShown: Function;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public hideTooltip: Function;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public tooltipHidden: Function;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public tooltipInserted: Function;

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
    if (this.showTooltip) {
      // @ts-ignore
      $(this.parentElement).on('show.bs.tooltip', this.showTooltip);
    }
    if (this.tooltipShown) {
      // @ts-ignore
      $(this.parentElement).on('shown.bs.tooltip', this.tooltipShown);
    }
    if (this.hideTooltip) {
      // @ts-ignore
      $(this.parentElement).on('hide.bs.tooltip', this.hideTooltip);
    }
    if (this.tooltipHidden) {
      // @ts-ignore
      $(this.parentElement).on('hidden.bs.tooltip', this.tooltipHidden);
    }
    if (this.tooltipInserted) {
      // @ts-ignore
      $(this.parentElement).on('inserted.bs.tooltip', this.tooltipInserted);
    }
  }


  private detached() {
    $(this.parentElement).tooltip('dispose');
  }

}
