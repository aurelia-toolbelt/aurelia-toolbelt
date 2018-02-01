import { customElement, inject, bindable, bindingMode, BindingEngine, containerless } from 'aurelia-framework';

export type TooltipPlacement = 'auto' | 'top' | 'bottom' | 'left' | 'right';
export type TooltipBoundary = 'viewport' | 'window' | 'scrollParent';

import * as $ from 'jquery';

@containerless()
@inject(Element)
@customElement('abt-tooltip')
export class BootstrapTooltipCustomElement {

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public container: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public delay: number | object = 0;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public placement: TooltipPlacement | Function = 'top';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public selector: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public animation: boolean | string = true;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public html: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public trigger: string = 'hover focus';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public offset: number | string = 0;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public fallbackPlacement: string | string[] = 'flip';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public boundary: TooltipBoundary = 'scrollParent';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public template: string =
    '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>';

  @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsShow: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsShown: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsHide: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsHidden: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsInserted: Function;

  private tooltip: Element;
  private parentElement: HTMLElement;

  private afterAttached() {
    this.parentElement = this.tooltip.parentElement;
    let slotContent = this.html ? this.tooltip.innerHTML : this.tooltip.textContent;

    this.offset = Number(this.offset);
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

    if (this.bsShow) {
      // @ts-ignore
      $(this.parentElement).on('show.bs.tooltip', () => {
        if (this.bsShow) {
          this.bsShow();
        }
      });
    }

    if (this.bsShown) {
      // @ts-ignore
      $(this.parentElement).on('shown.bs.tooltip', () => {
        if (this.bsShown) {
          this.bsShown();
        }
      });
    }

    if (this.bsHide) {
      // @ts-ignore
      $(this.parentElement).on('hide.bs.tooltip', () => {
        if (this.bsHide) {
          this.bsHide();
        }
      });
    }

    if (this.bsHidden) {
      // @ts-ignore
      $(this.parentElement).on('hidden.bs.tooltip', () => {
        if (this.bsHidden) {
          this.bsHidden();
        }
      });
    }

    if (this.bsInserted) {
      // @ts-ignore
      $(this.parentElement).on('inserted.bs.tooltip', () => {
        if (this.bsInserted) {
          this.bsInserted();
        }
      });
    }
  }

  private detached() {
    $(this.parentElement).tooltip('dispose');
  }

}
