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

    let tab_daddy: HTMLElement;
    let tab_grandPa: HTMLElement;

    let isTheFirstChild: boolean = this.tab_header.parentElement.children.item(0) === this.tab_header;

    this.selected = this.selected !== null ? Boolean(this.selected) : null;

    this.isActive = this.selected !== null ? this.selected : this.element.hasAttribute('active');
    this.isDisabled = this.element.hasAttribute('disabled');

    tab_daddy = this.tab_header.parentElement;
    tab_grandPa = <HTMLElement>tab_daddy.parentElement.children.item(1);

    tab_daddy.removeChild(this.tab_body);

    let id = this.element.hasAttribute('id') ? this.element.getAttribute('id') : this.uuid.Uuidv4ForId();
    // if the slot part is empty then do not add tab_body to grandPa :wink:
    if (this.tab_body.textContent.length > 8) {

      let tab_body_id = `${id}-tab-body`;

      this.selected = isTheFirstChild;

      this.isFade =
        tab_daddy.parentElement.hasAttribute('fade') &&
        (
          tab_daddy.parentElement.getAttribute('fade') === ''
          ||
          tab_daddy.parentElement.getAttribute('fade') === 'true'
        );

      const isPill =
        tab_daddy.parentElement.hasAttribute('pills') &&
        (
          tab_daddy.parentElement.getAttribute('pills') === ''
          ||
          tab_daddy.parentElement.getAttribute('pills') === 'true'
        );

      const isTabs =
        tab_daddy.parentElement.hasAttribute('tabs') &&
        (
          tab_daddy.parentElement.getAttribute('tabs') === ''
          ||
          tab_daddy.parentElement.getAttribute('tabs') === 'true'
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

      tab_grandPa.appendChild(this.tab_body);

    }
  }
}
