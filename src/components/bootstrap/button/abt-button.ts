
import { inject } from 'aurelia-dependency-injection';
import { customElement, containerless, bindable, bindingMode } from 'aurelia-framework';


@inject(Element)
@containerless()
@customElement('abt-button')
export class BootstrapButton {

  @bindable({ defaultBindingMode: bindingMode.oneTime }) public size: string = 'md';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public type: string = 'button';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public bsType: string = 'primary';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public id: string;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public outline: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public block: boolean | string = false;



  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string = '';

  @bindable({ defaultBindingMode: bindingMode.twoWay }) public click: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public disabled: boolean | string = false;

  private isBusy: boolean = false;
  private task: Promise<void> | null = null;

  constructor(private element: Element) { }

  private afterAttached() {

    const onlyOutlineAttribute = (this.outline === '' && this.element.hasAttribute('outline'));
    this.outline = onlyOutlineAttribute || this.outline === 'true' || this.outline === true;

    const onlyBlockAttribute = (this.block === '' && this.element.hasAttribute('block'));
    this.block = onlyBlockAttribute || this.block === 'true' || this.block === true;

    const onlyDisabledAttribute = (this.disabled === '' && this.element.hasAttribute('disabled'));
    this.disabled = onlyDisabledAttribute || this.disabled === 'true' || this.disabled === true;

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

    this.task = Promise.resolve(this.click({ event: event, target: event.target }))
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
  }

}
