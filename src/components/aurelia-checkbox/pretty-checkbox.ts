import { customAttribute, autoinject, bindable, customElement, inject, bindingMode } from 'aurelia-framework';
import 'pretty-checkbox/dist/pretty-checkbox.css';


@inject(Element)
@customElement('aut-checkbox')
export class PrettyCheckboxCustomElement {

  @bindable({ defaultBindingMode: bindingMode.twoWay }) public checked: Boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public disabled: Boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public name: string = '';


  @bindable({ defaultBindingMode: bindingMode.oneTime }) public switch: Boolean | String = false;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public outlined: Boolean | String = false;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public color: string;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public offColor: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public offLabel: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public animation: string = '';


  private thickCss: string;
  private plainCss: string;
  private colorCss: string;
  private offColorCss: string;
  private appearanceCSS: string;
  private animationCss: string;
  private isCheckBox: boolean;

  constructor(private element: Element) { }

  private attached() {


    if (!this.element.hasAttribute) {
      console.warn(this.element);
    }

    this.switch = this.switch === true || this.switch === 'true' || this.element.hasAttribute('switch');
    this.outlined = this.outlined === true || this.outlined === 'true' || this.element.hasAttribute('outline');
    this.checked = this.checked === true || this.checked === 'true' || this.checked === 'checked' || this.element.hasAttribute('checked');
    this.disabled = this.disabled === true || this.disabled === 'true' || this.disabled === 'disabled' || this.element.hasAttribute('disabled');
    this.colorCss = `p-${this.color}`; // ${this.outlined ? '-o' : ''}`;
    this.offColorCss = this.offColor !== '' ? `p-${this.offColor}` : ''; // ${this.outlined ? '-o' : ''}`;

    if (this.switch) {
      if (this.element.hasAttribute('slim')) {
        this.appearanceCSS = 'p-slim';

      } else if (this.element.hasAttribute('outline')) {
        this.appearanceCSS = 'p-outline';
      } else {
        this.appearanceCSS = 'p-fill';
      }
    } else {
      if (this.element.hasAttribute('curve')) {
        this.appearanceCSS = 'p-curve';

      } else if (this.element.hasAttribute('round')) {
        this.appearanceCSS = 'p-round';
      } else {
        this.appearanceCSS = '';
      }
    }

    this.thickCss = this.element.hasAttribute('thick') ? 'p-thick' : '';
    this.thickCss = this.element.hasAttribute('plain') ? 'p-plain' : '';
    this.animationCss = this.animation !== '' ? `p-${this.animation}` : '';

    this.isCheckBox = !this.element.hasAttribute('radio');

    console.log(this.isCheckBox);

  }

  private disabledChanged(newValue: Boolean | string) {
    console.log(newValue);
    this.disabled = newValue === true || newValue === 'true' || newValue === 'disabled';
  }

  private checkedChanged(newValue: Boolean | string) {
    console.log(newValue);
    this.checked = newValue === true || newValue === 'true' || newValue === 'disabled';
  }

}
