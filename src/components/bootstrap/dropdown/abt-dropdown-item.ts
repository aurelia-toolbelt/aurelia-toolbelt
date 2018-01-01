import { customElement, inject, containerless, bindable, bindingMode } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';


@inject(EventAggregator)
@containerless()
@customElement('abt-dropdown-item')
export class BootstrapDropdownItem {

  @bindable({ defaultBindingMode: bindingMode.twoWay }) public value: any;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public model: any;

  private dropdown: Element;

  private dropdown_id: any;

  private item: HTMLDivElement;

  constructor(private ea: EventAggregator) { }

  private attached() {
    this.dropdown_id = this.item.parentElement.parentElement.parentElement.getAttribute('data-id');
  }

  private onClick() {
    this.ea.publish('Abt-DropDownSelectChanged', { parentId: this.dropdown_id });
    console.log(this.item);
  }
}

