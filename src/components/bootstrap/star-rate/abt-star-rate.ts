
import { bindable, bindingMode, inject, children, computedFrom, customElement } from 'aurelia-framework';

@customElement('abt-star-rate')
export class BootstrapStarRate {

  
  @bindable({defaultBindingMode: bindingMode.oneTime}) public rtl = false;
  @bindable({defaultBindingMode: bindingMode.oneTime}) public color = '#753B85';
  @bindable({defaultBindingMode: bindingMode.oneTime}) public type = 'primary';
  
  @bindable({defaultBindingMode: bindingMode.oneWay}) public maxRate: number = 5;
  @bindable({defaultBindingMode: bindingMode.oneWay}) public readOnly = false;
  
  
  @bindable({defaultBindingMode: bindingMode.oneTime}) public fullStar = 'abt-star abt-full-star';
  @bindable({defaultBindingMode: bindingMode.oneTime}) public halfStar: string | null = null;
  @bindable({defaultBindingMode: bindingMode.oneTime}) public emptyStar = 'abt-star abt-empty-star';
  

  @bindable({ defaultBindingMode: bindingMode.twoWay }) public rate: number = 0;
  @bindable({defaultBindingMode: bindingMode.twoWay}) public rateChanged: Function;




  @children('i') private icons: Array<HTMLElement>;
  private mouseRate = -1;
  private showHalfStar = false;



  private mouseMove(event: any, index: number) {

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

  private setRate(index: number) {

    if (this.readOnly) {
      return;
    }

    const oldValue = this.rate;
    this.rate = index + 1 - (this.showHalfStar ? 0.5 : 0);

    if (this.rateChanged) { this.rateChanged({ newRate: this.rate, oldRate: oldValue }); }
  }

  private mouseLeft() {
    if (this.readOnly) {
      return;
    }
    this.showHalfStar = false;
    this.mouseRate = -1;
  }


  @computedFrom('mouseRate', 'rate')
  private get currentValue() {
    const x = (this.mouseRate !== -1 ? this.mouseRate : this.rate);

    return x;
  }

  @computedFrom('currentValue')
  private get hasFloatingPoint() {
    const mode = this.currentValue % 1;
    return mode > 0 && mode < 1;
  }

  @computedFrom('currentValue')
  get fixedPoint() {
    return Math.floor(this.currentValue);
  }
}
