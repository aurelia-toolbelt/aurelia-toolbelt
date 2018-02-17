import { customElement, inject, bindable, bindingMode, BindingEngine } from 'aurelia-framework';
import { Disposable } from 'aurelia-binding';


import * as $ from 'jquery';

import 'aureliatoolbelt-thirdparty/bootstrap-toggle/bootstrap-toggle.js';

@inject(Element, BindingEngine)
@customElement('abt-toggle')
export class BootstrapToggleCustomElement {


  /*  One-Time bindable properties */
  @bindable({ defaultBindingMode: bindingMode.oneTime }) private on: string = 'On';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) private off: string = 'Off';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) private onType: string = 'primary';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) private offType: string = 'secondary';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) private css: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) private size: string = 'normal';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) private width: number | null = null;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) private height: number | null = null;
  /*  ************************************** */


  @bindable({ defaultBindingMode: bindingMode.oneWay }) private class: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) private style: string = '';

  /*  Two-Way bindable properties */
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public value: any;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public model: any;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public checked: any;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public matcher: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public disabled: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public rtl: boolean | string = false;
  /*  ************************************** */

  private checkbox: HTMLInputElement;
  private subscription: Disposable | null = null;

  constructor(private element: Element, private bindingEngine: BindingEngine) {
  }

  private disabledChanged(newValue: boolean | string) {
    if (newValue) {
      this.checkbox.setAttribute('disabled', 'disabled');
    } else {
      if (this.checkbox.hasAttribute('disabled')) {
        this.checkbox.removeAttribute('disabled');
      }
    }
  }

  private onChanged() {

    if (this.disabled) {
      return;
    }

    let newValue = this.element.children.item(0).children.item(0).classList.contains('off');

    this.synchronizeModel(!newValue);
  }

  private synchronizeModel(newState: any) {

    if (!Array.isArray(this.checked)) { // it is a boolean value
      this.checked = newState;
      return;
    }

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

    let state = newValue;

    if (Array.isArray(this.checked)) {
      const index = this.matcher
        ? this.checked.findIndex(x => this.matcher(x, this.value || this.model))
        : this.checked.indexOf(this.value || this.model);

      state = index !== -1;
    }

    if (state) {
      // @ts-ignore
      $(this.checkbox).prop('checked', true).change();

      // this.checkbox.setAttribute('checked', true);
    } else {
      // @ts-ignore
      $(this.checkbox).prop('checked', false).change();

      // this.checkbox.removeAttribute('checked');

    }
  }

  private attached() {
    // @ts-ignore
    $(this.checkbox).bootstrapToggle({
      on: this.on,
      off: this.off,
      size: this.size,
      onstyle: this.onType,
      offstyle: this.offType,
      width: this.width,
      height: this.height
    });
  }

  private bind() {

    // const onlyDisabledAttribute = (this.disabled === '' && this.element.hasAttribute('disabled'));
    this.disabled = (this.disabled === '' && this.element.hasAttribute('disabled')) || (this.disabled && this.disabled.toString() === 'true');
    // const onlyCheckedAttribute = (this.checked === '' && this.element.hasAttribute('checked'));


    if (!Array.isArray(this.checked)) {

      this.checked = (this.checked === '' && this.element.hasAttribute('checked')) || (this.checked && this.checked.toString() === 'true');
    }


    this.disabledChanged(this.disabled);
    this.synchronizeView(this.checked);
  }

  private unbind() {
    this.disposeSubscription();
  }

  private disposeSubscription() {
    if (this.subscription !== null) {
      this.subscription.dispose();
      this.subscription = null;
    }
  }
}
