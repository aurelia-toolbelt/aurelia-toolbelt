
import { bindable, bindingMode, inject, children, computedFrom, customElement } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { StarRateClicked } from './StarRateClicked';

@customElement('au-star-rate')
@inject(EventAggregator)
export class StarRate {

  @bindable({ defaultBindingMode: bindingMode.twoWay }) rate: number;

  @bindable maxRate: number;
  @bindable readOnly: boolean = true;
  @bindable color: string = '#753B85';
  @bindable rtl: boolean = false;



  @bindable fullStar: string = 'au-star au-full-star';
  @bindable halfStar: string | null = null;
  @bindable emptyStar: string = 'au-star au-empty-star';

  @bindable clicked:any;




  @children('i') icons: Array<HTMLElement>;
  private mouseRate: number = -1;
  private showHalfStar: boolean = false;

  constructor(private ea: EventAggregator) {
  }


  mouseMove(event:any, index:number) {

    if (this.readOnly) {
      return;
    }

    if (this.halfStar) {
      const calculatedIndex = this.rtl ? this.maxRate - index - 1 : index;
      const controlLeft = this.rtl ? this.icons[calculatedIndex].getBoundingClientRect().right : this.icons[calculatedIndex].getBoundingClientRect().left;
      const currentMousePosition = this.rtl ? controlLeft - event.clientX : event.clientX - controlLeft;
      this.showHalfStar = currentMousePosition < (this.icons[calculatedIndex].clientWidth / 2);
    }

    this.mouseRate = index + 1 - (this.showHalfStar ? 0.5 : 0);
  
  }

  setRate(index: number) {

    if (this.readOnly) {
      return;
    }

    const oldValue = this.rate;
    this.rate = index + 1 - (this.showHalfStar ? 0.5 : 0);

    if (this.clicked) { this.clicked({ newRate: this.rate, oldRate: oldValue }); }
    this.ea.publish(new StarRateClicked(this.rate, oldValue));
  }

  mouseLeft() {
    if (this.readOnly) {
      return;
    }
    this.showHalfStar = false;
    this.mouseRate = -1;
  }


  @computedFrom('mouseRate', 'rate')
  get currentValue() {
    const x = (this.mouseRate != -1 ? this.mouseRate : this.rate);

    return x;
  }

  @computedFrom('currentValue')
  get hasFloatingPoint() {
    const mode = this.currentValue % 1;
    return mode > 0 && mode < 1;
  }

  @computedFrom('currentValue')
  get fixedPoint() {
    return Math.floor(this.currentValue);
  }
}
