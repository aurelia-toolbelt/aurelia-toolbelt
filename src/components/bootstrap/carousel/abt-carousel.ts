import { inject, customElement, bindingMode, bindable, containerless } from 'aurelia-framework';
import * as $ from 'jquery';

@customElement('abt-carousel')
export class CarouselCustomElement {
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public prevTitle: string = 'Previous';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public nextTitle: string = 'Next';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public prevIcon: string = 'carousel-control-prev-icon';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public nextIcon: string = 'carousel-control-next-icon';

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public navigator: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public indicator: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public interval: number | string = 5000;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public keyboard: boolean | string = true;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public pause: boolean | string = true;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public ride: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public wrap: boolean | string = true;

  @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsSlide: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsSlid: Function;


  private showNavigator = false;
  private showIndicator = false;

  private carousel: Element;
  private carouselTemplate: Element;

  private afterAttached() {

    this.interval = Number(this.interval);
    this.showNavigator = (this.navigator === '' && this.carouselTemplate.hasAttribute('navigator')) || this.navigator.toString() === 'true';
    this.showIndicator = (this.indicator === '' && this.carouselTemplate.hasAttribute('indicator')) || this.navigator.toString() === 'true';
    this.keyboard = (this.keyboard === '' && this.carouselTemplate.hasAttribute('keyboard')) || this.keyboard.toString() === 'true';
    this.pause = (this.pause === '' && this.carouselTemplate.hasAttribute('pause')) || this.pause.toString() === 'true';
    this.ride = (this.ride === '' && this.carouselTemplate.hasAttribute('ride')) || this.ride.toString() === 'true';
    this.wrap = (this.wrap === '' && this.carouselTemplate.hasAttribute('wrap')) || this.wrap.toString() === 'true';


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
