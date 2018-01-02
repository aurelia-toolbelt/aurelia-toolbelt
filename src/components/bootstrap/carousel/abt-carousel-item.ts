import { inject, customElement, bindingMode, bindable, containerless } from 'aurelia-framework';
@inject(Element)
@containerless()
@customElement('abt-carousel-item')
export class CarouselItemCustomElement {
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public src: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public alt: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string = 'd-block';

}
