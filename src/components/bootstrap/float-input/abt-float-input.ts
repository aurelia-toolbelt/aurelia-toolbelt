import { inject, customElement, bindable, bindingMode, containerless, PLATFORM, noView, DOM } from 'aurelia-framework';

export type FloatInputPlacement = 'sm' | 'md' | 'lg';
@containerless()
@customElement('abt-float-input')
export class BootstrapFloatInput {
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public id: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public placeholder: string = null;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public placeholderFontSize: string = null;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public labelFontSize: string = null;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public placeholderOpacity: string = null;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public placeholderTop: string = null;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public size: FloatInputPlacement = 'md';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public type: string = 'text';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public labelColor: string = null;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public placeholderColor: string = null;

  private floatInput: HTMLInputElement;
  private floatInputLabel: HTMLLabelElement;

  private afterAttached() {

    let id = this.floatInputLabel.id;
    let fontSize = '';
    let top = '';

    if (!this.floatInput.classList.contains('form-control')) {
      this.floatInput.classList.add('form-control');
    }
    if (this.floatInput.classList.contains('form-control-sm')) {
      this.size = 'sm';
    }
    if (this.floatInput.classList.contains('form-control-lg')) {
      this.size = 'lg';
    }

    if (this.size === 'sm') {
      this.floatInput.classList.add('form-control-sm');
      fontSize = '90%';
      top = '.5em';
    } else if (this.size === 'lg' || this.floatInput.classList.contains('form-control-lg')) {
      this.floatInput.classList.add('form-control-lg');
      fontSize = '120%';
      top = '.7em';
    } else {
      this.floatInput.classList.remove('form-control-sm');
      this.floatInput.classList.remove('form-control-lg');
      fontSize = '100%';
      top = '.7em';
    }

    if (this.floatInput.classList.contains('form-control')) {
      this.floatInputLabel.classList.add('has-float-label');

      let style = `
                  #${id}.has-float-label .form-control:placeholder-shown:not(:focus) + * {
                    color : ${this.placeholderColor || 'black'} !important;
                    font-size: ${this.placeholderFontSize || fontSize} !important;
                    opacity: ${this.placeholderOpacity || '.5'} !important;
                    top: ${this.placeholderTop || top} !important;
                  }
                  #${id}.has-float-label label, #${id}.has-float-label > span
                  {
                    color : ${this.labelColor || 'black'} !important;
                    font-size: ${this.labelFontSize || '75%'} !important;
                  }`;

      DOM.injectStyles(style, null, null, 's' + id);
    }
  }
}
