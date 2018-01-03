import { inject, customElement, bindingMode, bindable, containerless } from 'aurelia-framework';
@inject(Element)
@containerless()
@customElement('abt-carousel-image-item')
export class CarouselImageItemCustomElement {
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public src: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public alt: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string = 'd-block w-100';

  private isActive: boolean = false;
  private firstTime: number = 0;
  private carouselItem: Element;

  constructor(private element: Element) {

  }

  private attached() {
    let isActive = this.element.hasAttribute('active');
    console.log(isActive);
    if (isActive) {
      this.carouselItem.classList.add('active');
    }
  }
}
