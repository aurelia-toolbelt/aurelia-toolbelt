
import { inject } from 'aurelia-dependency-injection';
import { customElement, containerless, bindable, bindingMode } from 'aurelia-framework';


@inject(Element)
@customElement('aut-button')
export class BootstrapButton {

    @bindable({ defaultBindingMode: bindingMode.oneTime }) public color: string = 'primary';
    @bindable({ defaultBindingMode: bindingMode.oneTime }) public size: string = 'md';
    @bindable({ defaultBindingMode: bindingMode.oneTime }) public type: string = 'button';

    @bindable({ defaultBindingMode: bindingMode.twoWay }) public clicked: Function;
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

    private buttonClicked(event: Event) {
        event.preventDefault();

        console.log('buttonClicked');

        if (!this.clicked || this.disabled) {
            return;
        }

        if (this.task) {
            return;
        }

        this.isBusy = true;
        const target = this.element.children.item(0);

        this.task = Promise.resolve(this.clicked({ event: event, target: target }))
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
        this.element.children.item(0).removeEventListener('click', this.buttonClicked);
    }

}
