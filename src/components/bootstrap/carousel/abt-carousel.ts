import { EventAggregator } from 'aurelia-event-aggregator';
import { inject, customElement, bindingMode, bindable, containerless } from 'aurelia-framework';


@inject(EventAggregator)
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

  private activeIndex: number = 0;

  constructor(private eventAggregator: EventAggregator) {

  }

  private attached() {
    let id = this.carousel.id;
    this.eventAggregator.subscribeOnce(id, (index: any) => {
      this.activeIndex = index;
    });
  }
}
