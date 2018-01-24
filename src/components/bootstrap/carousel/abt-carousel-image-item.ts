import { inject, customElement, bindingMode, bindable, containerless, singleton } from 'aurelia-framework';
import { SharedIndex } from './shared-index';


@inject(Element, SharedIndex)
@containerless()
@customElement('abt-carousel-image-item')
export class CarouselImageItemCustomElement {
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public src: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public alt: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string = 'd-block w-100';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public active: boolean | string;

  private isActive: boolean = false;
  private carouselItem: Element;
  private times: number = 0;

  constructor(private element: Element, private sharedController: SharedIndex) {

  }

  private createIndicatorHtml(id: string, index: number): any {
    return `<li style="cursor:pointer" data-target="#${id}" data-slide-to="${index}" class="${this.active ? 'active' : ''}" ></li>`;
  }

  private afterAttached() {

    this.times = this.sharedController.getAndIncrement();
    let isActive = this.element.hasAttribute('active');
    let carousel = this.carouselItem.parentElement.parentElement;
    let carouselOl = carousel.children[0];
    let isOl = carouselOl.nodeName.toLowerCase() === 'ol';
    if (isOl) {
      carouselOl.innerHTML += this.createIndicatorHtml(carousel.id, this.times);
    }
    if (this.active) {
      this.carouselItem.classList.add('active');
    }
  }
}


