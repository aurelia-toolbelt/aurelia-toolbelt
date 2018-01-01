import { customElement, inject, containerless, bindable, bindingMode, children } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';


const uuidv5 = require('uuid/v5');


@inject(Element, EventAggregator)
// @containerless()
@customElement('abt-dropdown')
export class BootstrapDropDown {

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public size: string = 'md';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public title: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public color: string = 'primary';
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public click: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public disabled: boolean | string = false;

  @bindable({ defaultBindingMode: bindingMode.twoWay }) public value: any;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public matcher: any;

  private isSplit: boolean = false;
  private isBusy: boolean = false;
  private task: Promise<void> | null = null;
  private id: any;


  private children: NodeListOf<HTMLAnchorElement>;

  constructor(private element: Element, ea: EventAggregator) {

    this.id = uuidv5();

    ea.subscribe('Abt-DropDownSelectChanged', (parentId: any) => {
      if (parentId === this.id) {
        alert('changed');
      }
    });

  }

  private attached() {

    this.isSplit = this.element.hasAttribute('split');

    this.children = <NodeListOf<HTMLAnchorElement>>this.element.getElementsByClassName('dropdown-item');

  }


  private onClicked(event: any) {

    event.preventDefault();

    if (!this.click || this.disabled) {
      return;
    }

    if (this.task) {
      return;
    }

    this.isBusy = true;

    this.task = Promise.resolve(this.click({ event: event, target: this.element }))
      .then(
      () => this.clickCompleted(),
      () => this.clickCompleted()
      );
  }

  private clickCompleted() {
    this.task = null;
    this.isBusy = false;
  }

  private detached() {
    this.task = null;
    // this.element.previousElementSibling.removeEventListener('click', this.onClick);
  }

}
