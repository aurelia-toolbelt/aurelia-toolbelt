import { bindingMode, bindable, containerless, customElement, inject } from 'aurelia-framework';


@containerless()
@customElement('abt-modal-header')
export class BootstrapModalHeader {

  private dismissible: boolean = false;

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string = '';


  private header: HTMLDivElement;

  private afterAttached() {
    let x = this.header.parentElement.parentElement.parentElement.getAttribute('data-abt-dismissible');
    this.dismissible = x === 'true';
  }

}
