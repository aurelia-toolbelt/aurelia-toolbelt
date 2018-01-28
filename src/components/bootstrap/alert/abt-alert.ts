import { customElement, containerless, bindable, bindingMode } from 'aurelia-framework';
import { inject } from 'aurelia-dependency-injection';


import * as $ from 'jquery';

@inject(Element)
// @containerless()
@customElement('abt-alert')
export class BootstrapAlert {

  @bindable({ defaultBindingMode: bindingMode.oneTime }) public size: string = 'md';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public type: string = 'primary';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public animate: boolean | string = true;


  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public showAlert: boolean | null = null;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public dismissible: boolean | string = false;

  @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsShow: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsShown: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsHide: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsHidden: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsClose: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsClosed: Function;

  private alert: HTMLDivElement;

  constructor(private element: Element) {
  }

  private attached() {

    const onlyDismissibleAttribute = (this.dismissible === '' && this.element.hasAttribute('dismissible'));
    this.dismissible = onlyDismissibleAttribute || this.dismissible.toString() === 'true';

    const onlyAnimateAttribute = (this.animate === '' && this.element.hasAttribute('animate'));
    this.animate = onlyAnimateAttribute || this.animate === 'true' || this.animate === true;

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


  private async showAlertChanged(newValue: boolean) {

    if (newValue) {

      let continueShow = true;

      if (this.bsShow) {
        continueShow = (await this.bsShow({ target: this.alert }));
      }

      continueShow = continueShow === undefined || continueShow === null ? true : continueShow;

      if (!continueShow) {
        this.showAlert = !newValue;
        return;
      }

      if (this.animate) {
        $(this.alert).fadeIn();
      } else {
        $(this.alert).show();
      }

      if (this.bsShown) {
        this.bsShown({ target: this.alert });
      }

    } else {

      let continueHide = true;

      if (this.bsHide) {
        continueHide = (await this.bsHide({ target: this.alert }));
      }

      continueHide = continueHide === undefined || continueHide === null ? true : continueHide;

      if (!continueHide) {
        this.showAlert = !newValue;
        return;
      }

      if (this.animate) {
        $(this.alert).fadeOut();
      } else {
        $(this.alert).hide();
      }

      if (this.bsHidden) {
        this.bsHidden({ target: this.alert });
      }

    }

  }

  private detached() {
    $(this.alert).alert('close');
    $(this.alert).alert('dispose');
  }

}
