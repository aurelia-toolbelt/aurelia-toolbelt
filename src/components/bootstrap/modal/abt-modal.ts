import { bindingMode, bindable, containerless, customElement, inject } from 'aurelia-framework';


@inject(Element)
@containerless()
@customElement('abt-modal')
export class BootstrapModal {

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string = '';

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public animate: string | boolean = true;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public dismissible: string | boolean = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public centered: string | boolean = false;


  // @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsShow: Function;
  // @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsShown: Function;
  // @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsHide: Function;
  // @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsHidden: Function;

  @bindable({ defaultBindingMode: bindingMode.oneTime }) public openBy: HTMLElement;


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
    // if (this.bsShow) {
    //     $(this.collapse).on('show.bs.collapse', () => {
    //         if (this.bsShow) {
    //             this.bsShow();
    //         }
    //     });
    // }

    // if (this.bsShown) {
    //     $(this.collapse).on('shown.bs.collapse', () => {
    //         if (this.bsShown) {
    //             this.bsShown();
    //         }
    //     });
    // }

    // if (this.bsHide) {
    //     $(this.collapse).on('hide.bs.collapse', () => {
    //         if (this.bsHide) {
    //             this.bsHide();
    //         }
    //     });
    // }

    // if (this.bsHidden) {
    //     $(this.collapse).on('hidden.bs.collapse', () => {
    //         if (this.bsHidden) {
    //             this.bsHidden();
    //         }
    //     });
    // }

  }

  private afterAttached() {

    this.animate = this.animate === true || this.animate === 'true';
    this.centered = this.centered === true || this.centered === 'true';
    this.dismissible = this.dismissible === true || this.dismissible === 'true';

    this.setEvents();

    if (this.openBy) {
      this.setOpenerProperties(this.openBy);
    } else {
      throw Error(`The 'abt-modal' should have an 'open-by' property`);
    }

  }
}
