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


  private carousel: Element;


  private attached() {

    $(this.carousel).carousel('cycle');
  }

  private detached() {

    $(this.carousel).carousel('dispose');
  }

}
