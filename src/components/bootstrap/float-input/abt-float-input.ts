import { inject, customElement, bindable, bindingMode, containerless, PLATFORM, noView, DOM, useShadowDOM } from 'aurelia-framework';

@inject(Element)
@containerless()
@customElement('abt-float-input')
export class BootstrapFloatInput {
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public id: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public placeholder: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public type: string = 'text';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public labelColor: string = null;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public placeholderColor: string = null;

  private floatInput: HTMLInputElement;
  private floatInputLabel: HTMLLabelElement;

  constructor(private element: Element) {
  }

  // tslint:disable-next-line:no-empty
  private bind() {
    if (!this.floatInput.classList.contains('form-control')) {
      this.floatInput.classList.add('form-control');
    }

    if (this.floatInput.classList.contains('form-control-sm')) {
      this.floatInputLabel.classList.add('has-float-label-sm');
      DOM.injectStyles(`
            .has-float-label-sm .form-control:placeholder-shown:not(:focus) + * {
                color : ${this.placeholderColor || 'black'} !important;
              }

              .has-float-label-sm label, .has-float-label-sm > span
              {
                color :  ${this.labelColor || 'black'} !important;
              }
            `);
    }
    if (this.floatInput.classList.contains('form-control-lg')) {
      this.floatInputLabel.classList.add('has-float-label-lg');
      DOM.injectStyles(`
             .has-float-label-lg .form-control:placeholder-shown:not(:focus) + * {
                color : ${this.placeholderColor || 'black'} !important;
              }
              .has-float-label-lg label, .has-float-label-lg > span
              {
                color :  ${this.labelColor || 'black'} !important;
              }
            `);
    }
    if (!this.floatInput.classList.contains('form-control-sm') && !this.floatInput.classList.contains('form-control-lg')) {
      this.floatInputLabel.classList.add('has-float-label-md');
      DOM.injectStyles(`
            .has-float-label-md .form-control:placeholder-shown:not(:focus) + * {
                color : ${this.placeholderColor || 'black'} !important;
              }
              .has-float-label-md label, .has-float-label-md > span
              {
                color :  ${this.labelColor || 'black'} !important;
              }
            `);
    }
  }


}
