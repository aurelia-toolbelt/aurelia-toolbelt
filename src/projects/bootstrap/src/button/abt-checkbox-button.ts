import { inject, bindable, bindingMode, Disposable, BindingEngine, customElement, containerless } from 'aurelia-framework';



@inject(Element, BindingEngine)
@customElement('abt-checkbox-button')
@containerless()
export class AtCheckboxButton {

  @bindable({ defaultBindingMode: bindingMode.twoWay }) public value: any;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public model: any;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public checked: any;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public matcher: any;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public disabled: boolean | string = false;


  @bindable({ defaultBindingMode: bindingMode.oneTime }) public id: string;

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string = '';

  @bindable({ defaultBindingMode: bindingMode.oneTime }) public bsType: string = 'primary';


  private state: boolean;
  private subscription: Disposable | null = null;

  constructor(private element: Element, private bindingEngine: BindingEngine) {
  }

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

    this.disabled = this.disabled === true || this.disabled === 'true' || this.disabled === 'disabled'; // || this.element.hasAttribute('disabled');

    this.synchronizeView(this.checked);

  }

  private unbind() {
    this.disposeSubscription();
  }

}
