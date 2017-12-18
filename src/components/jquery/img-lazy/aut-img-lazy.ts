import { customElement, inject, bindable, bindingMode, observable, DOM, containerless } from 'aurelia-framework';
import * as $ from 'jquery';
import 'jquery-lazy';

export type ScrollDirection = 'both' | 'vertical' | 'horizontal';

@customElement('aut-img-lazy')
@containerless()
export class JQueryLazy {

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public backgroundMode: boolean = false;

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
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public onError: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public onFinishedAll: Function;

  // Custom Loaders
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public customLoader: Function;

  // Attribute

  private attached() {
    if (this.customLoader !== undefined) {
      $('.lazy').attr('data-loader', 'customLoader');
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
      onError: this.onError,
      onFinishedAll: this.onFinishedAll
    };
    // @ts-ignore
    $('.lazy').lazy(config);
  }
}
