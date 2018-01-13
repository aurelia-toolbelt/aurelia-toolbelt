
import { customElement, bindable, bindingMode, inject } from 'aurelia-framework';
import { ZenscrollService } from '../../../services/purejs/zenscroll/zenscroll-service';

// @inject(Element, ZenscrollService)
@customElement('aut-scrollup')
export class ScrollUpCustomElement {
    constructor() {
        let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    }
    private myFunction() {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            console.log('<50');
        } else {
            console.log('>50');
        }
    }

    private attached() {
        window.onscroll = () => this.myFunction();
    }
}
