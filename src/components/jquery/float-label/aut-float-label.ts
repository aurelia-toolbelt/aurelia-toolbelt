import { inject, customElement, bindable, bindingMode, containerless, PLATFORM, noView, DOM, useShadowDOM } from 'aurelia-framework';

export type FloatInputDirection = 'rtl' | 'ltr';
export type FloatInputSize = 'sm' | 'md' | 'lg';

@containerless()
@customElement('aut-float-label')
export class BootstrapFloatLabel {
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public id: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public labelStyle: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public labelClass: string = 'primary';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public placeholder: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public placeholderColor: string = 'black';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public type: string = 'text';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public direction: FloatInputDirection = 'ltr';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public size: FloatInputSize = 'md';
  private sizeClass: string = '';
  private labelDirection: string = '';
  private floatInput: HTMLInputElement;
  private floatLabel: HTMLLabelElement;
  private floatLabelTemplate: Element;
  private attached() {

    this.sizeClass = this.size === 'sm' ? 'form-control-sm' : (this.size === 'lg' ? 'form-control-lg' : '');
    this.labelDirection = this.direction === 'ltr' ? 'aut-float-label-ltr' : 'aut-float-label-rtl';
    if ($('.aut-float-label input').length) {
      let aut_float_on_class = 'on';
      let aut_float_show_class = 'show';

      $('.float-input').on('aut-check-value', function () {
        let _aut_label = $(this).closest('.aut-float-label').find('.float-label');
        if ((<HTMLInputElement>this).value !== '') {
          _aut_label.addClass(aut_float_show_class);
        } else {
          _aut_label.removeClass(aut_float_show_class);
        }
      })
        .on('keyup', function () {
          $(this).trigger('aut-check-value');
        })
        .on('focus', function () {
          $(this).closest('.aut-float-label').find('.float-label').addClass(aut_float_on_class);
        })
        .on('blur', function () {
          $(this).closest('.aut-float-label').find('.float-label').removeClass(aut_float_on_class);
        }).trigger('aut-check-value');
    }
  }
}

