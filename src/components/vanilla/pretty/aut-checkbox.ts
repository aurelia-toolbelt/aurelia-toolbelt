import {
  customAttribute, autoinject, bindable,
  customElement, inject, bindingMode,
  Disposable, BindingEngine
} from 'aurelia-framework';
// import 'pretty-checkbox/dist/pretty-checkbox.css';


@inject(Element, BindingEngine)
@customElement('aut-checkbox')
export class PrettyCheckboxCustomElement {


  @bindable({ defaultBindingMode: bindingMode.twoWay }) public value: any;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public model: any;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public checked: any;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public matcher: any;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public disabled: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public name: string = '';


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
  private isCheckBox: boolean;

  private state: boolean;
  private subscription: Disposable | null = null;

  constructor(private element: Element, private bindingEngine: BindingEngine) { }

  private changed() {
    if (this.disabled) {
      return;
    }

    this.state = !this.state;
    this.synchronizeModel(this.state);
  }

  private synchronizeModel(newState: any) {

    // console.log(`new state: ${newState}`);
    // console.log(`checked: ${this.checked}`);

    if (!Array.isArray(this.checked)) { // it is a boolean value
      this.checked = newState;
      return;
    }

    // console.log(`Is checked an Array: ${Array.isArray(this.checked)}`);
    // if (Array.isArray(this.checked)) {
    //   console.log(this.checked);
    // }
    // console.log(`value/model: ${this.value}/${this.model}`);
    // console.log(`matcher: ${this.matcher}`);
    // console.log('***********************************************************');

    if (newState && (
      (this.matcher && this.checked.findIndex(x => this.matcher(x, this.value || this.model)) === -1)
      ||
      (this.checked.indexOf(this.value || this.model) === -1)
    )) {
      this.checked.push(this.value || this.model);
    } else if (!newState) {
      const index = this.matcher
        ? this.checked.findIndex(x => this.matcher(x, this.value || this.model))
        : this.checked.indexOf(this.value || this.model);

      if (index !== -1) {
        this.checked.splice(index, 1);
      }
    }

  }

  private checkedChanged(newValue: any) { // public: Array|undefined, Array|undefined

    // console.log('#########   VALUES ###########');
    // console.log(newValue);
    // console.log(oldValue);
    // console.log('##############################');
    // unsubscribe from the previous array's mutation (eg push/pop/splice)
    this.disposeSubscription();
    // subscribe to the current array's mutation

    if (Array.isArray(this.checked)) {
      this.subscription = this.bindingEngine.collectionObserver(this.checked)
        .subscribe(() => {
          // console.log('sync array view');
          this.synchronizeView(newValue);
        });
    }
    // console.log('sync  view');
    this.synchronizeView(newValue);
  }

  private synchronizeView(newValue: any) { // private
    if (Array.isArray(this.checked)) {
      const index = this.matcher
        ? this.checked.findIndex(x => this.matcher(x, this.value || this.model))
        : this.checked.indexOf(this.value || this.model);
      this.state = index !== -1;
    } else {
      this.state = newValue;
      // console.log(`state is now: ${this.state}`);
      // }
    }
  }

  private disposeSubscription() {
    if (this.subscription !== null) {
      this.subscription.dispose();
      this.subscription = null;
    }
  }



  private bind() {

    if (!this.element.hasAttribute) {
      console.warn(this.element);
    }

    this.switch = this.switch === true || this.switch === 'true' || this.element.hasAttribute('switch');
    this.outlined = this.outlined === true || this.outlined === 'true' || this.element.hasAttribute('outlined');
    // this.state = this.checked === true || this.checked === 'true' || this.checked === 'checked'; // || this.element.hasAttribute('checked');
    this.disabled = this.disabled === true || this.disabled === 'true' || this.disabled === 'disabled'; // || this.element.hasAttribute('disabled');
    this.colorCss = `p-${this.color}`; // ${this.outlined ? '-o' : ''}`;
    this.offColorCss = this.offColor !== '' ? `p-${this.offColor}` : ''; // ${this.outlined ? '-o' : ''}`;

    if (this.switch) {
      if (this.element.hasAttribute('slim')) {
        this.appearanceCSS = 'p-slim';

      } else if (this.element.hasAttribute('outlined')) {
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


    this.synchronizeView(this.checked);

  }

  private unbind() {
    this.disposeSubscription();
  }
}
