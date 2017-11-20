
import { noView, customAttribute, inject, bindable, bindingMode } from 'aurelia-framework';

import './aut-block-ui.css';

@noView(['./aut-block-ui.css'])
@customAttribute('aut-block-ui')
@inject(Element)
export class BlockUI {

    @bindable({ defaultBindingMode: bindingMode.oneWay }) private block: boolean | string = false;

    private blocker: HTMLDivElement;

    constructor(private element: Element) {
        this.blocker = document.createElement('div');
    }

    private attached() {
        this.blocker.innerText = 'I am blocking you';

        // The calculations must be done before appendChild(this.blocker)
        const left = this.element.getBoundingClientRect().left;
        const top = this.element.getBoundingClientRect().top;
        const width = this.element.getBoundingClientRect().width;
        const height = this.element.getBoundingClientRect().height;

        this.element.appendChild(this.blocker);

        this.blocker.style.cssText = `position: fixed;display: none;width: ${width}px;height: ${height}px;top: ${top}px;left: ${left}px;
        background-color: rgba(0, 0, 0, 0.5);z-index: 9999999;cursor: pointer;`;
    }


    private blockChanged(doBlocking: boolean) {

        console.log(`do blocking: ${doBlocking}`);

        if (doBlocking) {
            this.blocker.style.display = 'block';
            // this.element.appendChild(this.blocker);
            return;
        }

        if (this.blocker.parentElement === this.element) {
            this.blocker.style.display = 'none';
            // this.element.removeChild(this.blocker);
        }

    }

}
