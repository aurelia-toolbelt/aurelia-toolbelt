import { DOM, containerless, inject, bindingMode, bindable, children } from 'aurelia-framework';
import { customElement } from 'aurelia-templating';

type ExpandSize = '' | 'sm' | 'md' | 'lg';
type Placement = '' | 'fixed-top' | 'fixed-bottom' | 'sticky-top';

@inject(Element)
@customElement('abt-navbar')
export class BootstrapNavBar {
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string;

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public colorClass: string = 'light';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public backgroundColorClass: string = 'light';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public expandSize: ExpandSize = 'lg';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public placement: Placement = '';

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public controllBy: string[];

  private navbar: Element;
  private navbarCollapse: Element;

  private afterAttached() {
    this.navbar.classList.add(`navbar-${this.colorClass}`);
    this.navbar.classList.add(`bg-${this.backgroundColorClass}`);

    if (this.expandSize !== '') {
      this.navbar.classList.add(`navbar-expand-${this.expandSize}`);
    }

    let navbarToggler = <HTMLButtonElement>this.navbar.querySelector('.abt-navbar-toggler');
    let navbarCollapser = <HTMLDivElement>this.navbar.querySelector('.abt-navbar-collapser');
    if (navbarToggler && navbarCollapser) {
      navbarToggler.setAttribute('data-target', `#${navbarCollapser.id}`);
      navbarToggler.setAttribute('aria-controls', `${navbarCollapser.id}`);
    }
  }
}
