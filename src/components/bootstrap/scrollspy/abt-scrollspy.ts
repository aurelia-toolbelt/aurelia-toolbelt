import { customElement, inject, containerless, bindable, bindingMode } from 'aurelia-framework';


import * as $ from 'jquery';


@inject(Element)
@containerless()
@customElement('abt-scrollspy')
export class BootstrapScrollSpy {

  @bindable({ defaultBindingMode: bindingMode.oneTime }) public target: string;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public offset: number = 0;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsScrollspy: Function;


  private spy: HTMLElement;

  constructor(private element: Element) { }


  private afterAttached() {

    // $(this.spy).scrollspy({ target: this.target[0] === '#' ? this.target : `#${this.target}`, offset: 1 });

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
