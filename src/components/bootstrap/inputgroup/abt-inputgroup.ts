import { customElement, inject, bindable, bindingMode, BindingEngine, containerless } from 'aurelia-framework';


export type Size = 'sm' | 'md' | 'lg';

@containerless()
@customElement('abt-inputgroup')
export class BootstrapInputGroupCustomElement {
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public class: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public style: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public size: Size = 'md';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public id: string;

  private inputGroup: Element;
  private inputGroupTemplate: Element;
  private attached() {
    if (this.size === 'sm' || this.inputGroupTemplate.hasAttribute('sm')) {
      this.inputGroup.classList.add('input-group-sm');
    } else if (this.size === 'lg' || this.inputGroupTemplate.hasAttribute('lg')) {
      this.inputGroup.classList.add('input-group-lg');
    } else {
      this.inputGroup.classList.remove('input-group-sm');
      this.inputGroup.classList.remove('input-group-lg');
    }
  }

}
