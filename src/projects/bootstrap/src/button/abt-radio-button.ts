import { inject, bindable, bindingMode, Disposable, BindingEngine, customElement, containerless } from 'aurelia-framework';



@inject(Element, BindingEngine)
@customElement('at-radio-button')
@containerless()
export class AtRadioButton {

  @bindable({ defaultBindingMode: bindingMode.twoWay }) public value: any;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public model: any;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public checked: any;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public matcher: any;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public disabled: boolean | string = false;


  @bindable({ defaultBindingMode: bindingMode.oneTime }) public id: string;

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string = '';

  @bindable({ defaultBindingMode: bindingMode.oneTime }) public bsType: string = 'primary';

  @bindable({ defaultBindingMode: bindingMode.oneTime }) public name: string = '';

  private state: boolean;
  private subscription: Disposable | null = null;

  private radioButton: HTMLInputElement;

  constructor(private element: Element, private bindingEngine: BindingEngine) {
  }

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

      // to change the active class on labels on model change
      this.state = this.radioButton.checked;
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

    // to change the active class on labels on model change at init time
    this.state = this.radioButton.checked;

  }


  private bind() {

    this.disabled = this.disabled === true || this.disabled === 'true' || this.disabled === 'disabled'; // || this.element.hasAttribute('disabled');
    this.synchronizeView();
  }


}
