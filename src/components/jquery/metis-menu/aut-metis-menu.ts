import { inject, customElement, containerless, bindable, bindingMode } from 'aurelia-framework';


import * as $ from 'jquery';
import 'metismenu';

@inject(Element)
@containerless()
@customElement('aut-metis-menu')
export class JQueryMetisMenu {

    private metismenu: HTMLUListElement;

    @bindable({ defaultBindingMode: bindingMode.oneTime }) public class: string = '';
    @bindable({ defaultBindingMode: bindingMode.oneTime }) public style: string = '';

    @bindable({ defaultBindingMode: bindingMode.twoWay }) public showMenu: Function;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) public shownMenu: Function;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) public hideMenu: Function;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) public hiddenMenu: Function;


    constructor(private element: Element) {
    }

    private attached() {
        // @ts-ignore
        $(this.metismenu).metisMenu()
            .on('show.metismenu', (event: any) => {
                console.log(`show menu: ${JSON.stringify(event)}`);

                console.log(this.showMenu);
                let localEvent = this.showMenu;

                if (localEvent !== null || localEvent !== undefined) {
                    Promise.resolve(() => {
                        localEvent(event);
                    });
                }

            })
            .on('shown.metismenu', (event: any) => {

                /** auto scroll */

                // var navbarHeight = $('.navbar').height();

                // $('body,html').animate({
                //     scrollTop: $(event.target).parent('li').position().top - navbarHeight
                //   }, 600);
                /***************************************************************************** */

                console.log(`shown menu: ${JSON.stringify(event)}`);

                let localEvent = this.shownMenu;

                if (localEvent !== null || localEvent !== undefined) {
                    Promise.resolve(() => {
                        localEvent(event);
                    });
                }

            })
            .on('hide.metismenu', (event: any) => {

                console.log(`hide menu: ${JSON.stringify(event)}`);

                let localEvent = this.hideMenu;

                if (localEvent !== null || localEvent !== undefined) {
                    Promise.resolve(() => {
                        localEvent(event);
                    });
                }

            })
            .on('hidden.metismenu', (event: any) => {

                console.log(`menu hidden: ${JSON.stringify(event)}`);

                let localEvent = this.hiddenMenu;

                if (localEvent !== null || localEvent !== undefined) {
                    Promise.resolve(() => {
                        localEvent(event);
                    });
                }

            });
    }

    private detached() {
        // dispose to avoid memory leak
        // @ts-ignore
        $(this.metismenu).metisMenu('dispose');
    }

}
