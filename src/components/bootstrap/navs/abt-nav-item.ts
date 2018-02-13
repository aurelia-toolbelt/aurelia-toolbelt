import { containerless, bindable, bindingMode, inject, customElement } from 'aurelia-framework';
import { Uuid } from '../../../utilities/vanilla/uuid';



@inject(Element, Uuid)
@containerless()
@customElement('abt-nav-item')
export class BootstrapNavItem {

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string;

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public href: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public title: string;

  @bindable({ defaultBindingMode: bindingMode.oneTime }) public active: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public disabled: boolean | string = false;

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

    const onlyActiveAttribute = (this.active === '' && this.element.hasAttribute('active'));
    this.active = onlyActiveAttribute || this.active === 'true' || this.active === true;

    const onlyDisabledAttribute = (this.disabled === '' && this.element.hasAttribute('disabled'));
    this.disabled = onlyDisabledAttribute || this.disabled === 'true' || this.disabled === true;

    navs.removeChild(this.tab_body);

    let id = this.element.hasAttribute('id') ? this.element.getAttribute('id') : this.uuid.Uuidv4ForId();
    // if the slot part is empty then do not add tab_body to grandPa :wink:
    if (this.tab_body.textContent.length > 8) {

      navComponent = navs.parentElement.parentElement.parentElement;

      let tab_body_id = `${id}-tab-body`;

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
      this.tab_header.setAttribute('aria-selected', `${this.active}`);

      this.tab_header.setAttribute('href', `#${tab_body_id}`);

      /** generate attributes for tab-content */
      this.tab_body.setAttribute('id', `${tab_body_id}`);
      this.tab_body.setAttribute('aria-labelledby', `${id}`);

      tab_content.appendChild(this.tab_body);

    }
  }
}
