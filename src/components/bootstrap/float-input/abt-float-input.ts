import { inject, customElement, bindable, bindingMode, containerless, PLATFORM, noView, DOM } from 'aurelia-framework';

@inject(Element)
@containerless()
@customElement('abt-float-input')
export class BootstrapFloatInput {
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string = '';
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public placeholder: string = '';
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public type: string = 'text';
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public labelColor: string = null;
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public placeholderColor: string = null;

    private floatInput: HTMLInputElement;

    constructor(private element: Element) {
    }

    // tslint:disable-next-line:no-empty
    private bind() {
        if (!this.floatInput.classList.contains('form-control')) {
            this.floatInput.classList.add('form-control');
        }

        if (this.floatInput.classList.contains('form-control-sm')) {
            DOM.injectStyles(`
            .has-float-label .form-control:placeholder-shown:not(:focus) + * {
                font-size: 80% !important;
                opacity: .5 !important;
                top: .7em !important;
                color : ${this.placeholderColor || 'black'} !important;
              }

              .has-float-label label, .has-float-label > span
              {
                color :  ${this.labelColor || 'black'} !important;
              }
            `);
        }
        if (this.floatInput.classList.contains('form-control-lg')) {
            DOM.injectStyles(`
            .has-float-label .form-control:placeholder-shown:not(:focus) + * {
                font-size: 120% !important;
                opacity: .5 !important;
                top: .7em !important;
                color : ${this.placeholderColor || 'black'} !important;
              }

              .has-float-label label, .has-float-label > span
              {
                color :  ${this.labelColor || 'black'} !important;
              }
            `);
        }
        if (!this.floatInput.classList.contains('form-control-sm') && !this.floatInput.classList.contains('form-control-lg')) {
            DOM.injectStyles(`
            .has-float-label .form-control:placeholder-shown:not(:focus) + * {
                font-size: 100% !important;
                opacity: .5 !important;
                top: .7em !important;
                color : ${this.placeholderColor || 'black'} !important;
              }

              .has-float-label label, .has-float-label > span
              {
                color :  ${this.labelColor || 'black'} !important;
              }
            `);
        }
    }


}
