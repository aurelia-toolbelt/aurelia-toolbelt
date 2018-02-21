
import { bindable, bindingMode, inject, children, computedFrom, customElement } from 'aurelia-framework';

@inject(Element)
@customElement('abt-star-rate')
export class BootstrapStarRate {


  @bindable({ defaultBindingMode: bindingMode.oneTime }) public rtl: boolean | string = false;

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public type: string = 'primary';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public color: string | null = null;

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public maxRate: number = 5;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public disabled: boolean | string = false;


  @bindable({ defaultBindingMode: bindingMode.oneTime }) public fullStar = 'fa fa-star';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public emptyStar = 'fa fa-star-o';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public halfStar: boolean | string = false;



  @bindable({ defaultBindingMode: bindingMode.twoWay }) public rate: number = 0;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public rateChanged: Function;


  @children('i') private icons: Array<HTMLElement>;
  private mouseRate = -1;
  private showHalfStar = false;
  private halfStarClass: string | null = null; // fa fa-star-half-o

  constructor(private element: Element) { }

  private bind() {
    const onlyDisabledAttribute = (this.disabled === '' && this.element.hasAttribute('read-only'));
    this.disabled = onlyDisabledAttribute || this.disabled.toString() === 'true';

    const onlyRTLAttribute = (this.rtl === '' && this.element.hasAttribute('rtl'));
    this.rtl = onlyRTLAttribute || this.rtl.toString() === 'true';

    const onlyHalfStarAttribute = (this.halfStar === '' && this.element.hasAttribute('half-star'));
    this.halfStar = onlyHalfStarAttribute || this.halfStar.toString() === 'true';

    this.maxRate = Number(this.maxRate);
    this.rate = Number(this.rate);

  }

  private halfStarChanged(newValue: boolean | null) {
    this.halfStarClass = newValue ? 'fa fa-star-half-o' : null;
  }

  private mouseMove(event: any, index: number) {

    if (this.disabled) {
      return;
    }

    if (this.halfStarClass) {
      const calculatedIndex = this.rtl ? this.maxRate - index - 1 : index;
      const controlLeft = this.rtl ? this.icons[calculatedIndex].getBoundingClientRect().right : this.icons[calculatedIndex].getBoundingClientRect().left;
      const currentMousePosition = this.rtl ? controlLeft - event.clientX : event.clientX - controlLeft;
      this.showHalfStar = currentMousePosition < (this.icons[calculatedIndex].clientWidth / 2);
    }

    this.mouseRate = index + 1 - (this.showHalfStar ? 0.5 : 0);

  }

  private setRate(index: number) {

    if (this.disabled) {
      return;
    }

    const oldValue = this.rate;
    this.rate = index + 1 - (this.showHalfStar ? 0.5 : 0);

    if (oldValue !== this.rate && this.rateChanged) { this.rateChanged({ newRate: this.rate, oldRate: oldValue }); }
  }

  private mouseLeft() {
    if (this.disabled) {
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
