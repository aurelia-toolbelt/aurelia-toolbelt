import { customElement, inject, containerless, bindable, bindingMode } from 'aurelia-framework';


import * as $ from 'jquery';


@inject(Element)
@containerless()
@customElement('abt-scrollspy')
export class BootstrapScrollSpy {


  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string;


  @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsScrollspy: Function;


  private spy: HTMLElement;

  constructor(private element: Element) { }


  private afterAttached() {
    $(this.spy).scrollspy({ target: '#list-example', offset: 1 });

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
