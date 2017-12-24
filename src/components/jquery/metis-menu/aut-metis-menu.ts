import { inject, customElement, containerless, bindable, bindingMode } from 'aurelia-framework';


import * as $ from 'jquery';
import 'metismenu';

@inject(Element)
@containerless()
@customElement('aut-metis-menu')
export class JQueryMetisMenu {

    private metismenu: HTMLUListElement;

    @bindable({ defaultBindingMode: bindingMode.twoWay }) public show: Function;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) public shown: Function;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) public hide: Function;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) public hidden: Function;


    constructor(private element: Element) {
    }

    private attached() {
        $(this.metismenu).metisMenu()
            .on('show.metismenu', (event) => {
                console.log(`show menu: ${JSON.stringify(event)}`);

                let localEvent = this.show;

                if (localEvent !== null || localEvent !== undefined) {
                    Promise.resolve(() => {
                        localEvent(event);
                    });
                }

            })
            .on('shown.metismenu', (event) => {

                /** auto scroll */

                // var navbarHeight = $('.navbar').height();

                // $('body,html').animate({
                //     scrollTop: $(event.target).parent('li').position().top - navbarHeight
                //   }, 600);
                /***************************************************************************** */

                console.log(`shown menu: ${JSON.stringify(event)}`);

                let localEvent = this.shown;

                if (localEvent !== null || localEvent !== undefined) {
                    Promise.resolve(() => {
                        localEvent(event);
                    });
                }

            })
            .on('hide.metismenu', (event) => {

                console.log(`hide menu: ${JSON.stringify(event)}`);

                let localEvent = this.hide;

                if (localEvent !== null || localEvent !== undefined) {
                    Promise.resolve(() => {
                        localEvent(event);
                    });
                }

            })
            .on('hidden.metismenu', (event) => {

                console.log(`menu hidden: ${JSON.stringify(event)}`);

                let localEvent = this.hidden;

                if (localEvent !== null || localEvent !== undefined) {
                    Promise.resolve(() => {
                        localEvent(event);
                    });
                }

            });
    }

    private detached() {
        // dispose to avoid memory leak
        $(this.metismenu).metisMenu('dispose');
    }

}
