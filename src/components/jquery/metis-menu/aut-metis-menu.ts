import { inject, customElement, containerless } from 'aurelia-framework';


import * as $ from 'jquery';
import 'metismenu';

@inject(Element)
// @containerless()
@customElement('aut-metis-menu')
export class JQueryMetisMenu {

    constructor(private element: Element) {
    }

    private created() {
        console.log('parent');
        // @ts-ignore
        $('#myID').metisMenu();
    }

}
