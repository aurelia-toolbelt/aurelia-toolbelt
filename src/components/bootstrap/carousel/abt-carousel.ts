import { inject, customElement, bindingMode, bindable, containerless } from 'aurelia-framework';
import * as $ from 'jquery';

@containerless()
@customElement('abt-carousel')
export class CarouselCustomElement {
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public prevControl: boolean = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public nextControl: boolean = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public prevControlTitle: string = 'Previous';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public nextControlTitle: string = 'Next';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public prevControlClass: string = 'carousel-control-prev-icon';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public nextControlClass: string = 'carousel-control-next-icon';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public showIndicator: boolean = false;

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public interval: number = 5000;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public keyboard: boolean = true;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public pause: boolean = true;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public ride: boolean = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public wrap: boolean = true;

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public slide: Function;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public slid: Function;

  private carousel: Element;
  private attached() {
    // @ts-ignore
    $(this.carousel).carousel({
      interval: this.interval,
      keyboard: this.keyboard,
      pause: this.pause,
      ride: this.ride,
      wrap: this.wrap
    });
    if (this.slide) {
      $(this.carousel).on('slide.bs.carousel', this.slide());
    }

    if (this.slid) {
      $(this.carousel).on('slid.bs.carousel', this.slid());
    }
  }

  private detached() {

    $(this.carousel).carousel('dispose');
  }

}
