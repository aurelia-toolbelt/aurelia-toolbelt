import { inject, customElement, bindingMode, bindable, containerless, singleton } from 'aurelia-framework';
import { SharedIndex } from './shared-index';


@inject(Element, SharedIndex)
@containerless()
@customElement('abt-carousel-item')
export class CarouselItemCustomElement {
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public src: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public alt: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string = 'd-block w-100';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public active: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public captionClass: string = 'd-none d-md-block';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public captionStyle: string;


  private isActive: boolean = false;
  private carouselItem: Element;
  private carouselTemplate: Element;

  private times: number = 0;

  constructor(private element: Element, private sharedController: SharedIndex) {
  }

  private createIndicatorHtml(id: string, index: number, beActive: boolean): any {
    return `<li style="cursor:pointer" data-target="#${id}" data-slide-to="${index}" class="${beActive ? 'active' : ''}" ></li>`;
  }
  private afterAttached() {

    this.active = Boolean(this.active);
    let carousel = this.carouselItem.parentElement.parentElement;

    this.times = this.sharedController.getAndIncrement(carousel.id);
    let isActive = this.active || this.carouselTemplate.hasAttribute('active');
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


