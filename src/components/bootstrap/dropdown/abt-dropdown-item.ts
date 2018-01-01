import { customElement, inject, containerless, bindable, bindingMode } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { BootstrapDropdownSelectedItemChanged } from './abt-dropdown-selected-item-changed';


@inject(EventAggregator)
@containerless()
@customElement('abt-dropdown-item')
export class BootstrapDropdownItem {

  @bindable({ defaultBindingMode: bindingMode.twoWay }) public value: any;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public model: any;

  private dropdownId: any;

  private item: HTMLDivElement;

  constructor(private ea: EventAggregator) { }

  private attached() {
    this.dropdownId = this.item.parentElement.parentElement.getAttribute('id');
  }

  private onClick() {
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

