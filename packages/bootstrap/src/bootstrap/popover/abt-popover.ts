import { customElement, inject, bindable, bindingMode, BindingEngine, containerless } from 'aurelia-framework';

export type PopoverPlacement = 'auto' | 'top' | 'bottom' | 'left' | 'right';
export type PopoverBoundary = 'viewport' | 'window' | 'scrollParent';

import * as $ from 'jquery';

@containerless()
@customElement('abt-popover')
export class BootstrapPopoverCustomElement {

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public animation: boolean | string = true;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public container: boolean | string | Element = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public delay: number | object = 0;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public html: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public placement: PopoverPlacement | Function = 'right';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public selector: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public title: string | Element | Function = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public trigger: string = 'click';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public offset: number | string = 0;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public fallbackPlacement: string | string[] = 'flip';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public boundary: PopoverBoundary = 'scrollParent';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public template: string =
    '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>';

  @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsShow: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsShown: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsHide: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsHidden: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsInserted: Function;

  private popover: Element;
  private popoverTemplate: Element;
  private parentElement: HTMLElement;

  private attached() {
    this.parentElement = this.popover.parentElement;
    let slotContent = this.html ? this.popover.innerHTML : this.popover.textContent;

    this.offset = Number(this.offset);
    this.animation = (this.animation === '' && this.popoverTemplate.hasAttribute('animation')) || this.animation.toString() === 'true';
    this.container = (this.container === '' && this.popoverTemplate.hasAttribute('container')) || this.container.toString() === 'true';
    this.html = (this.html === '' && this.popoverTemplate.hasAttribute('html')) || this.html.toString() === 'true';
    this.selector = (this.selector === '' && this.popoverTemplate.hasAttribute('selector')) || this.selector.toString() === 'true';

    // @ts-ignore
    $(this.parentElement).popover({
      'content': slotContent,
      'title': this.title,
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

    this.popover.remove();

    if (this.bsShow) {
      // @ts-ignore
      $(this.parentElement).on('show.bs.popover', () => {
        if (this.bsShow) {
          this.bsShow();
        }
      });
    }

    if (this.bsShown) {
      // @ts-ignore
      $(this.parentElement).on('shown.bs.popover', () => {
        if (this.bsShown) {
          this.bsShown();
        }
      });
    }

    if (this.bsHide) {
      // @ts-ignore
      $(this.parentElement).on('hide.bs.popover', () => {
        if (this.bsHide) {
          this.bsHide();
        }
      });
    }
    if (this.bsHidden) {
      // @ts-ignore
      $(this.parentElement).on('hidden.bs.popover', () => {
        if (this.bsHidden) {
          this.bsHidden();
        }
      });
    }

    if (this.bsInserted) {
      // @ts-ignore
      $(this.parentElement).on('inserted.bs.popover', () => {
        if (this.bsInserted) {
          this.bsInserted();
        }
      });
    }
  }

  private detached() {
    // $(this.parentElement).popover('hide');
    $(this.parentElement).popover('dispose');
  }

}
