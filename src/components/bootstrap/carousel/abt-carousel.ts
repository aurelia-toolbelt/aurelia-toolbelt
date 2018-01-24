import { inject, customElement, bindingMode, bindable, containerless } from 'aurelia-framework';
import * as $ from 'jquery';

@containerless()
@customElement('abt-carousel')
export class CarouselCustomElement {
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public prevTitle: string = 'Previous';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public nextTitle: string = 'Next';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public prevIconClass: string = 'carousel-control-prev-icon';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public nextIconClass: string = 'carousel-control-next-icon';

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public showNavigator: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public showIndicator: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public interval: number | string = 5000;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public keyboard: boolean | string = true;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public pause: boolean | string = true;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public ride: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public wrap: boolean | string = true;

  @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsSlide: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsSlid: Function;


  private carousel: Element;
  private afterAttached() {

    this.showNavigator = Boolean(this.showNavigator);
    this.showIndicator = Boolean(this.showIndicator);
    this.interval = Number(this.interval);
    this.keyboard = Boolean(this.keyboard);
    this.pause = Boolean(this.pause);
    this.ride = Boolean(this.ride);
    this.wrap = Boolean(this.wrap);

    // @ts-ignore
    $(this.carousel).carousel({
      interval: this.interval,
      keyboard: this.keyboard,
      pause: this.pause,
      ride: this.ride,
      wrap: this.wrap
    });
    if (this.bsSlide) {
      $(this.carousel).on('slide.bs.carousel', () => {
        if (this.bsSlide) {
          this.bsSlide();
        }
      });
    }

    if (this.bsSlid) {
      $(this.carousel).on('slid.bs.carousel', () => {
        if (this.bsSlid) {
          this.bsSlid();
        }
      });
    }
  }

  private detached() {
    $(this.carousel).carousel('dispose');
  }
}
