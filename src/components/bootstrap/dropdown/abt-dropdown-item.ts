import { customElement, inject, containerless } from 'aurelia-framework';


@inject(Element)
@containerless()
@customElement('abt-dropdown-item')
export class BootstrapDropdownItem {

  constructor(private element: Element) {

  }

}
