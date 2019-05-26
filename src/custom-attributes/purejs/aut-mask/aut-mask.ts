import { autoinject, bindable, bindingMode } from 'aurelia-framework';
import * as Inputmask from 'inputmask';

@autoinject
export class AutMaskCustomAttribute {
  private ignoreChange: boolean;
  private input: Element;
  private suppressOnInput: boolean;

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public value: any = undefined;

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public incompleteValue: any;

  @bindable
  public mask: string;

  @bindable
  public isValueMasked: boolean;

  @bindable
  public greedy: boolean = true;

  constructor(private element: Element) {

  }

  public valueChanged() {
    if (!this.input) {
      return;
    }
    if (this.ignoreChange) {
      this.ignoreChange = false;
      return;
    }
    if ($(this.input).val() !== this.value) {
      $(this.input).val(this.value);
    }
    let label = $(this.input).siblings('label');
    if (label.length) {
      $(label).addClass(this.value ? 'active' : 'inactive');
    }
  }

  public attached() {
    if (this.element.tagName === 'MD-INPUT') {
      this.input = this.element.getElementsByTagName('input')[0];
    } else if (this.element.tagName === 'INPUT') {
      this.input = this.element;
    } else {
      return;
    }
    $(this.input).on('focusout change input', (e) => {
      if (this.suppressOnInput) {
        return;
      }
      if (e.type === 'input') {
        this.suppressOnInput = true;
        this.input.dispatchEvent(new CustomEvent('input', { bubbles: true }));
        this.suppressOnInput = false;
      }
      this.incompleteValue = this.input.inputmask.unmaskedvalue();
      let value = this.input.inputmask.isComplete() ? (this.isValueMasked ? $(this.input).val() : this.input.inputmask.unmaskedvalue()) : '';
      if (this.value !== value) {
        this.ignoreChange = true;
        this.value = value;
      }
    });
    Inputmask(this.mask, { showMaskOnHover: false, greedy: this.greedy }).mask(this.input);
    $(this.input).val(this.value);
  }

  public detached() {
    $(this.input).off('focusout change input');
    this.input.inputmask.remove();
  }
}
