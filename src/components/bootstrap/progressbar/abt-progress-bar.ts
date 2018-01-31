import { inject, customAttribute, bindingMode, bindable, customElement, DOM, containerless } from 'aurelia-framework';
export type ColorType = 'primary' | 'secondary' | 'success' | 'danger'
  | 'warning' | 'info' | 'light' | 'dark';
@customElement('abt-progress-bar')
@containerless()
export class BootstrapProgressBar {

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public type: ColorType;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public color: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public gradientColor: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public value: number | string = 0;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public min: number | string = 0;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public max: number | string = 100;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public animated: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public striped: boolean | string = false;

  private isAnimated: boolean = false;
  private isStriped: boolean = false;
  private progressbar: Element;
  private progressbarTemplate: Element;

  private afterAttached() {
    let animated = (this.animated === '' && this.progressbarTemplate.hasAttribute('animated')) || this.animated.toString() === 'true';
    let striped = (this.striped === '' && this.progressbarTemplate.hasAttribute('striped')) || this.striped.toString() === 'true';

    this.value = Number(this.value);
    this.min = Number(this.min);
    this.max = Number(this.max);

    if (this.color && this.gradientColor) {
      this.gradientColorChanged(this.gradientColor);
    }
  }

  private gradientColorChanged(newValue: string) {
    if (this.progressbar) {
      DOM.injectStyles(`
      #${this.progressbar.id}
      {
        background: -webkit-gradient(linear, left top, right top, from(${this.color}),to(${newValue})) !important;
        background: -webkit-linear-gradient(left, ${this.color} 0%,${newValue} 100%) !important;
        background: -o-linear-gradient(left, ${this.color} 0%,${newValue} 100%) !important;
        background: linear-gradient(left, ${this.color} 0%,${newValue} 100%) !important;
      }
      `);
    }
  }


}
