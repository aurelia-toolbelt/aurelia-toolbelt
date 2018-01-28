import { Uuid } from './../../../utilities/purejs/uuid';
import { inject, customAttribute, bindingMode, bindable, customElement, DOM, containerless } from 'aurelia-framework';
export type ColorType = 'primary' | 'secondary' | 'success' | 'danger'
  | 'warning' | 'info' | 'light' | 'dark';
@inject(Uuid)
@customElement('abt-progress-bar')
@containerless()
export class BootstrapProgressBar {

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public colorType: ColorType;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public color: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public gradientColor: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public class: string;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public value: number | string = 0;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public min: number | string = 0;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public max: number | string = 100;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public animated: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public striped: boolean | string = false;

  private isAnimated: boolean = false;
  private isStriped: boolean = false;
  private progressbar: Element;
  private progressbarTemplate: Element;
  private id: string;

  constructor(private uuid: Uuid) {
  }

  private afterAttached() {
    this.animated = Boolean(this.animated) || this.progressbarTemplate.hasAttribute('animated');
    this.striped = Boolean(this.striped) || this.progressbarTemplate.hasAttribute('striped');
    this.value = Number(this.value);
    this.min = Number(this.min);
    this.max = Number(this.max);

    this.id = this.uuid.Uuidv4ForId();

    if (this.color && this.gradientColor) {
      DOM.injectStyles(`
      #${this.id}
      {
        background: -webkit-gradient(linear, left top, right top, from(${this.color}),to(${this.gradientColor})) !important;
        background: -webkit-linear-gradient(left, ${this.color} 0%,${this.gradientColor} 100%) !important;
        background: -o-linear-gradient(left, ${this.color} 0%,${this.gradientColor} 100%) !important;
        background: linear-gradient(left, ${this.color} 0%,${this.gradientColor} 100%) !important;
      }
      `);
    }

    if (this.colorType) {
      this.progressbar.classList.add(`bg-${this.colorType}`);
    }

  }

}
