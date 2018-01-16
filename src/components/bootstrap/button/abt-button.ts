
import { inject } from 'aurelia-dependency-injection';
import { customElement, containerless, bindable, bindingMode } from 'aurelia-framework';


@inject(Element)
@containerless()
@customElement('abt-button')
export class BootstrapButton {

  @bindable({ defaultBindingMode: bindingMode.oneTime }) public color: string = 'primary';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public style: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public size: string = 'md';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public type: string = 'button';

  @bindable({ defaultBindingMode: bindingMode.oneTime }) public id: string;

  @bindable({ defaultBindingMode: bindingMode.twoWay }) public click: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public disabled: boolean | string;

  private isOutlined: boolean = false;
  private isBlockLevel: boolean = false;

  private isBusy: boolean = false;
  private task: Promise<void> | null = null;

  constructor(private element: Element) {

  }

  private bind() {
    this.isOutlined = this.element.hasAttribute('outline');
    this.isBlockLevel = this.element.hasAttribute('block');
  }

  private onClick(event: Event) {
    event.preventDefault();

    if (!this.click || this.disabled) {
      return;
    }

    if (this.task) {
      return;
    }

    this.isBusy = true;

    this.task = Promise.resolve(this.click({ event: event, target: this.element.previousElementSibling }))
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
