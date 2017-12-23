import { inject, customElement, containerless } from 'aurelia-framework';


import * as $ from 'jquery';
import 'metismenu';

@inject(Element)
@containerless()
@customElement('aut-metis-menu')
export class JQueryMetisMenu {

    private metismenu: any;

    constructor(private element: Element) {
    }


    private attached() {
        $(this.metismenu).metisMenu();
    }

    private detached() {
        // dispose to avoid memory leak
        $(this.metismenu).metisMenu('dispose');
    }

}
