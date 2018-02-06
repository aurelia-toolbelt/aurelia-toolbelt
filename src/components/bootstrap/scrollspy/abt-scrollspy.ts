import { customElement, inject, containerless, bindable, bindingMode } from 'aurelia-framework';


import * as $ from 'jquery';


@inject(Element)
@containerless()
@customElement('abt-scrollspy')
export class BootstrapScrollSpy {

  @bindable({ defaultBindingMode: bindingMode.oneTime }) public target: string;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public offset: number = 10;

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsScrollspy: Function;

  @bindable({ defaultBindingMode: bindingMode.oneTime }) public onBody: boolean | string = false;


  private spy: HTMLElement;

  constructor(private element: Element) { }


  private afterAttached() {

    this.onBody = Boolean(this.onBody);
    this.offset = Number(this.offset);

    if (!this.onBody) {
      $(this.spy).scrollspy({ target: this.target[0] === '#' ? this.target : `#${this.target}`, offset: this.offset });

    } else {
      $('body').scrollspy({ target: this.target[0] === '#' ? this.target : `#${this.target}`, offset: this.offset });
    }

    if (this.bsScrollspy) {
      $(this.spy).on('activate.bs.scrollspy', () => {
        if (this.bsScrollspy) {
          this.bsScrollspy();
        }
      });
    }

  }


  private detached() {
    $(this.spy).scrollspy('dispose');
  }

}
