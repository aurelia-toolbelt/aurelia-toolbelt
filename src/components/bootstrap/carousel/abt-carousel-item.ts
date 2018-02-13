import { SharedIndex } from './../../../utilities/vanilla/sharedIndex';
import { inject, customElement, bindingMode, bindable, containerless, singleton } from 'aurelia-framework';

@inject(Element, SharedIndex)
@containerless()
@customElement('abt-carousel-item')
export class CarouselItemCustomElement {

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public active: boolean | string = false;

  private isActive: boolean = false;
  private carouselItem: Element;
  private carouselItemTemplate: Element;

  private times: number = 0;

  constructor(private element: Element, private sharedController: SharedIndex) {
  }

  private createIndicatorHtml(id: string, index: number, beActive: boolean): any {
    return `<li style="cursor:pointer" data-target="#${id}" data-slide-to="${index}" class="${beActive ? 'active' : ''}" ></li>`;
  }
  private afterAttached() {

    let carousel = this.carouselItem.parentElement.parentElement;
    this.times = this.sharedController.getAndIncrement(carousel.id);
    let isActive = (this.active === '' && this.carouselItemTemplate.hasAttribute('active')) || this.active.toString() === 'true';
    let carouselOl = carousel.children[0];
    let isOl = carouselOl.nodeName.toLowerCase() === 'ol';
    if (isOl) {
      carouselOl.innerHTML += this.createIndicatorHtml(carousel.id, this.times, isActive);
    }
    if (isActive) {
      this.carouselItem.classList.add('active');
    }
  }
}


