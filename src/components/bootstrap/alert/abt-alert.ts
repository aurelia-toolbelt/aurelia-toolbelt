import { customElement, containerless, bindable, bindingMode } from 'aurelia-framework';
import { inject } from 'aurelia-dependency-injection';


import * as $ from 'jquery';

@inject(Element)
@containerless()
@customElement('abt-alert')
export class BootstrapAlert {

  @bindable({ defaultBindingMode: bindingMode.oneTime }) public class: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public style: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public size: string = 'md';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public color: string = 'primary';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public dismissible: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public animate: boolean | string = true;


  @bindable({ defaultBindingMode: bindingMode.oneWay }) public showAlert: boolean | null = null;

  @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsClose: any;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsClosed: any;

  private alert: HTMLDivElement;

  constructor(private element: Element) {
  }

  private attached() {

    let onlyAttribute = (this.dismissible === '' && this.element.hasAttribute('dismissible'));

    this.dismissible = onlyAttribute || this.dismissible.toString() === 'true';

    this.animate = this.animate === 'true' || this.animate === true;

    if (this.bsClose) {
      $(alert).on('close.bs.alert', () => {
        if (this.bsClose) {
          this.bsClose();
        }
      });
    }

    if (this.bsClosed) {
      $(alert).on('closed.bs.alert', () => {
        if (this.bsClosed) {
          this.bsClosed();
        }
      });
    }

  }


  private showAlertChanged(newValue: boolean) {

    if (newValue) {
      if (this.animate) {
        $(this.alert).fadeIn();
      } else {
        $(this.alert).show();
      }
    } else {
      if (this.animate) {
        $(this.alert).fadeOut();
      } else {
        $(this.alert).hide();
      }
    }

  }

  private detached() {
    $(this.alert).alert('close');
    $(this.alert).alert('dispose');
  }

}
