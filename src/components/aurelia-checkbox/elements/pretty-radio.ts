import {
  customAttribute, autoinject, bindable,
  customElement, inject, bindingMode,
  Disposable, BindingEngine, children, child
} from 'aurelia-framework';
// import 'pretty-checkbox/dist/pretty-checkbox.css';


@inject(Element, BindingEngine)
@customElement('aut-radio')
export class PrettyRadioButtonCustomElement {

  @bindable({ defaultBindingMode: bindingMode.twoWay }) public value: any;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public model: any;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public checked: any;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public matcher: any;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public disabled: boolean | string = false;


  @bindable({ defaultBindingMode: bindingMode.oneTime }) public name: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public switch: boolean | String = false;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public outlined: boolean | String = false;
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

  private radioButton: HTMLInputElement;

  constructor(private element: Element, private bindingEngine: BindingEngine) { }

  private changed() {
    if (this.disabled) {
      return;
    }

    this.synchronizeModel();
  }

  private synchronizeModel() {

    this.checked = (this.model !== undefined)
      ? this.model
      : this.value;
  }

  private checkedChanged() { // public: Array|undefined, Array|undefined
    // subscribe to the current array's mutation

    this.synchronizeView();
  }

  private synchronizeView() { // private
    if (this.model !== undefined) {
      this.radioButton.checked = this.matcher
        ? this.matcher(this.checked, this.model)
        : this.checked === this.model;
    } else if (this.value) {
      this.radioButton.checked = this.matcher
        ? this.matcher(this.checked, this.value)
        : this.checked === this.value;
    }

  }


  private bind() {

    if (!this.element.hasAttribute) {
      console.warn(this.element);
    }

    this.switch = this.switch === true || this.switch === 'true' || this.element.hasAttribute('switch');
    this.outlined = this.outlined === true || this.outlined === 'true' || this.element.hasAttribute('outline');

    this.disabled = this.disabled === true || this.disabled === 'true' || this.disabled === 'disabled'; // || this.element.hasAttribute('disabled');
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
      } else {
        this.appearanceCSS = 'p-round';
      }
    }

    this.thickCss = this.element.hasAttribute('thick') ? 'p-thick' : '';
    this.thickCss = this.element.hasAttribute('plain') ? 'p-plain' : '';
    this.animationCss = this.animation !== '' ? `p-${this.animation}` : '';

    // console.log('bind');

    this.synchronizeView();
  }


}
