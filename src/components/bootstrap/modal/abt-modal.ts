import { bindingMode, bindable, containerless, customElement, inject } from 'aurelia-framework';

import * as $ from 'jquery';

@inject(Element)
// @containerless()
@customElement('abt-modal')
export class BootstrapModal {

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public size: string = 'md';


  @bindable({ defaultBindingMode: bindingMode.oneTime }) public animate: string | boolean = true;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public dismissible: string | boolean = true;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public centered: string | boolean = false;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public backdrop: string | boolean = true;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public keyboard: string | boolean = true;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public focus: string | boolean = true;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public openBy: HTMLElement;

  @bindable({ defaultBindingMode: bindingMode.twoWay }) public visible: string | boolean = false;


  @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsShow: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsShown: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsHide: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsHidden: Function;




  private modal: HTMLDivElement;

  constructor(private element: Element) {

  }

  private setOpenerProperties(open: any) {

    let isString = typeof open === 'string';

    let opener: HTMLElement;

    if (isString) {
      opener = document.getElementById(open);
    } else {
      opener = open;
    }
    let id = this.modal.id;

    opener.setAttribute('data-toggle', 'modal');
    opener.setAttribute('data-target', `#${id}`);

  }

  private setEvents() {
    if (this.bsShow) {
      $(this.modal).on('show.bs.modal', (e) => {
        if (this.bsShow) {
          this.bsShow({ relatedTarget: e.relatedTarget });
        }
      });
    }

    if (this.bsShown) {
      $(this.modal).on('shown.bs.modal', (e) => {
        if (this.bsShown) {
          this.bsShown({ relatedTarget: e.relatedTarget });
        }
      });
    }

    if (this.bsHide) {
      $(this.modal).on('hide.bs.modal', () => {
        if (this.bsHide) {
          this.bsHide();
        }
      });
    }

    if (this.bsHidden) {
      $(this.modal).on('hidden.bs.modal', () => {
        if (this.bsHidden) {
          this.bsHidden();
        }
      });
    }

  }

  private visibleChanged(newValue: string | boolean) {
    let nv = Boolean(newValue);

    if (nv) {
      $(this.modal).modal('show');
      return;
    }

    $(this.modal).modal('hide');

  }


  private afterAttached() {

    this.animate = this.animate === true || this.animate === 'true';
    this.centered = this.centered === true || this.centered === 'true';
    this.dismissible = this.dismissible === true || this.dismissible === 'true';


    this.backdrop = this.backdrop === true || this.backdrop === 'true';
    this.keyboard = this.keyboard === true || this.keyboard === 'true';
    this.focus = this.focus === true || this.focus === 'true';
    // this.show = this.show === true || this.show === 'true';

    this.setEvents();

    if (this.openBy) {
      this.setOpenerProperties(this.openBy);
    } else if (this.visible !== undefined) {
      this.visibleChanged(this.visible);
      $(this.modal).on('hide.bs.modal', () => {
        this.visible = false;
      });
    } else {
      throw Error(`The 'abt-modal' should have either 'open-by' or 'visible' attribute`);
    }

    // @ts-ignore
    $(this.modal).modal({
      backdrop: this.backdrop,
      keyboard: this.keyboard,
      focus: this.focus,
      show: false // this.show
    });

  }

  private detached() {
    $(this.modal).off('show.bs.modal');
    $(this.modal).off('shown.bs.modal');
    $(this.modal).off('hide.bs.modal');
    $(this.modal).off('hidden.bs.modal');
    $(this.modal).modal('hide');
    $(this.modal).modal('dispose');
    $(this.modal).remove();
  }

}
