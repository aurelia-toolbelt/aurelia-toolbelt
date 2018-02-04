import { containerless, bindable, bindingMode, inject, customElement } from 'aurelia-framework';
import { Uuid } from '../../../utilities/purejs/uuid';



@inject(Element, Uuid)
@containerless()
@customElement('abt-nav-item')
export class BootstrapNavLink {

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string;

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public href: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public title: string;

  @bindable({ defaultBindingMode: bindingMode.twoWay }) public selected: boolean | string | null = null;

  private isActive: boolean = false;
  private isDisabled: boolean = false;
  private isFade: boolean = false;

  private tab_header: HTMLAnchorElement;
  private tab_body: HTMLDivElement;


  private element: HTMLElement;

  constructor(element: Element, private uuid: Uuid) {

    this.element = <HTMLElement>element;

  }

  private attached() {

    let navComponent: HTMLElement;
    let navs: HTMLElement;
    let tab_content: HTMLElement;

    navs = this.tab_header.parentElement;
    tab_content = <HTMLElement>navs.parentElement.parentElement.children.item(1).children.item(0);

    let isTheFirstChild: boolean = navs.children.item(0) === this.tab_header;

    this.selected = this.selected !== null ? Boolean(this.selected) : null;

    this.isActive = this.selected !== null ? this.selected : this.element.hasAttribute('active');
    this.isDisabled = this.element.hasAttribute('disabled');


    navs.removeChild(this.tab_body);

    let id = this.element.hasAttribute('id') ? this.element.getAttribute('id') : this.uuid.Uuidv4ForId();
    // if the slot part is empty then do not add tab_body to grandPa :wink:
    if (this.tab_body.textContent.length > 8) {

      navComponent = navs.parentElement.parentElement.parentElement;

      let tab_body_id = `${id}-tab-body`;

      this.selected = isTheFirstChild;

      this.isFade =
        navComponent.hasAttribute('fade') &&
        (
          navComponent.getAttribute('fade') === ''
          ||
          navComponent.getAttribute('fade') === 'true'
        );

      const isPill =
        navComponent.hasAttribute('pills') &&
        (
          navComponent.getAttribute('pills') === ''
          ||
          navComponent.getAttribute('pills') === 'true'
        );

      const isTabs =
        navComponent.hasAttribute('tabs') &&
        (
          navComponent.getAttribute('tabs') === ''
          ||
          navComponent.getAttribute('tabs') === 'true'
        );



      let data_toggle = isTabs
        ? 'tab'
        : isPill
          ? 'pill'
          : '';

      this.tab_header.setAttribute('data-toggle', data_toggle);

      this.tab_header.setAttribute('role', 'tab');
      this.tab_header.setAttribute('aria-controls', `${tab_body_id}`);
      this.tab_header.setAttribute('aria-selected', `${this.selected || isTheFirstChild}`);

      this.tab_header.setAttribute('href', `#${tab_body_id}`);

      /** generate attributes for tab-content */
      this.tab_body.setAttribute('id', `${tab_body_id}`);
      this.tab_body.setAttribute('aria-labelledby', `${id}`);

      tab_content.appendChild(this.tab_body);

    }
  }
}
