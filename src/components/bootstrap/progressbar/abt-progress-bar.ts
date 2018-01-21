import { inject, customAttribute, bindingMode, bindable, customElement, DOM, containerless } from 'aurelia-framework';

@customElement('abt-progress-bar')
@containerless()
export class BootstrapProgressBar {


  @bindable({ defaultBindingMode: bindingMode.oneTime }) public color: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public colorClass: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public secondaryColor: string = '';

  @bindable({ defaultBindingMode: bindingMode.oneTime }) public value: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public min: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public max: string = '';

  @bindable({ defaultBindingMode: bindingMode.oneTime }) public animated: boolean = false;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public striped: boolean = false;

  private isAnimated: boolean = false;
  private isStriped: boolean = false;
  private progressbar: Element;
  private afterAttached() {
    if (this.color && this.secondaryColor) {
      DOM.injectStyles(`
      #${this.progressbar.id}
      {
      background: -webkit-gradient(linear, left top, right top, from(${this.color}),to(${this.secondaryColor})) !important;
      background: -webkit-linear-gradient(left, ${this.color} 0%,${this.secondaryColor} 100%) !important;
      background: -o-linear-gradient(left, ${this.color} 0%,${this.secondaryColor} 100%) !important;
      background: linear-gradient(left, ${this.color} 0%,${this.secondaryColor} 100%) !important;
      }
      `);
    }

  }

}
