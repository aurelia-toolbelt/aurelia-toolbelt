import { customElement, inject, bindable, bindingMode, BindingEngine, containerless } from 'aurelia-framework';

type Placement = 'auto' | 'top' | 'bottom' | 'left' | 'right';
type Boundary = 'viewport' | 'window' | 'scrollParent';

import * as $ from 'jquery';

@containerless()
@inject(Element)
@customElement('abt-tooltip')
export class BootstrapTooltipCustomElement {

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public container: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public delay: number | object = 0;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public placement: Placement | Function = 'top';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public selector: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public animation: boolean | string = true;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public html: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public trigger: string = 'hover focus';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public offset: number | string = 0;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public fallbackPlacement: string | string[] = 'flip';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public boundary: Boundary = 'scrollParent';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public template: string =
    '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>';

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public showTooltip: Function;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public tooltipShown: Function;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public hideTooltip: Function;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public tooltipHidden: Function;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public tooltipInserted: Function;

  private tooltip: Element;
  private parentElement: HTMLElement;

  private afterAttached() {
    this.parentElement = this.tooltip.parentElement;
    let slotContent = this.html ? this.tooltip.innerHTML : this.tooltip.textContent;

    this.animation = (this.animation === '' && this.tooltip.hasAttribute('animation')) || this.animation.toString() === 'true';
    this.container = (this.container === '' && this.tooltip.hasAttribute('container')) || this.container.toString() === 'true';
    this.html = (this.html === '' && this.tooltip.hasAttribute('html')) || this.html.toString() === 'true';
    this.selector = (this.selector === '' && this.tooltip.hasAttribute('selector')) || this.selector.toString() === 'true';

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
