import { customElement, inject, containerless, bindable, bindingMode } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { BootstrapDropdownSelectedItemChanged } from './abt-dropdown-selected-item-changed';


@inject(EventAggregator, Element)
@containerless()
@customElement('abt-dropdown-item')
export class BootstrapDropdownItem {


  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public disabled: boolean | string = null;

  @bindable({ defaultBindingMode: bindingMode.twoWay }) public value: any;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public model: any;

  private dropdownId: any;

  private item: HTMLDivElement;

  constructor(private ea: EventAggregator, private element: Element) { }

  private attached() {

    this.dropdownId = this.item.parentElement.parentElement.getAttribute('data-id');

    this.disabled = this.disabled === '' || this.disabled;

    if (this.model !== undefined || this.value !== undefined) {
      let selectedValue = this.model !== undefined
        ? this.model
        : this.value !== undefined
          ? this.value
          : undefined;
      this.ea.publish(new BootstrapDropdownSelectedItemChanged(this.dropdownId, selectedValue, this.item.innerText, false));
    }

  }

  private onClick() {

    if (this.disabled) {
      return;
    }

    if (this.model !== undefined || this.value !== undefined) {
      let selectedValue = this.model !== undefined
        ? this.model
        : this.value !== undefined
          ? this.value
          : undefined;
      this.ea.publish(new BootstrapDropdownSelectedItemChanged(this.dropdownId, selectedValue, this.item.innerText));
    }
  }
}

