import { customElement, inject, bindable, bindingMode, observable, DOM, containerless } from 'aurelia-framework';
import * as $ from 'jquery';
import 'jquery-lazy';

export type ScrollDirection = 'both' | 'vertical' | 'horizontal';

@inject(Element)
@containerless()
@customElement('aut-lazy-image')
export class JQueryLazyImage {

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public backgroundMode: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public style: string;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public class: string;

  // General
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public url: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public name: string = 'lazy';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public chainable: boolean = true;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public autoDestroy: boolean = true;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public bind: string = 'load';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public threshold: number = 500;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public visibleOnly: boolean = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public appendScroll: object = window;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public scrollDirection: ScrollDirection = 'both';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public imageBase: string = null;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public defaultImage: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public placeholder: string = null;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public delay: number = -1;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public combined: boolean = false;

  // Effect
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public effect: string = 'show';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public effectTime: number = 0;

  // Throttle
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public enableThrottle: boolean = true;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public throttle: number = 250;

  // Callbacks
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public beforeLoad: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public afterLoad: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public error: Function;
  // @bindable({ defaultBindingMode: bindingMode.twoWay }) public onFinishedAll: Function;

  // Custom Loaders
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public customLoader: Function;

  // Attribute

  constructor(private element: Element) { }

  private attached() {

    this.backgroundMode = this.backgroundMode === true || this.backgroundMode === 'true';

    if (this.customLoader !== undefined) {
      $(this.element.previousElementSibling).attr('data-loader', 'customLoader');
    }
    let config = {
      customLoader: this.customLoader,
      name: this.name,
      chainable: this.chainable,
      autoDestroy: this.autoDestroy,
      bind: this.bind,
      threshold: this.threshold,
      visibleOnly: this.visibleOnly,
      appendScroll: this.appendScroll,
      scrollDirection: this.scrollDirection,
      imageBase: this.imageBase,
      defaultImage: this.defaultImage,
      placeholder: this.placeholder,
      delay: this.delay,
      combined: this.combined,
      effect: this.effect,
      effectTime: this.effectTime,
      enableThrottle: this.enableThrottle,
      throttle: this.throttle,
      beforeLoad: this.beforeLoad,
      afterLoad: this.afterLoad,
      onError: this.error
      // ,onFinishedAll: this.onFinishedAll
    };
    // @ts-ignore
    $(this.element.previousElementSibling).lazy(config);
  }
}
