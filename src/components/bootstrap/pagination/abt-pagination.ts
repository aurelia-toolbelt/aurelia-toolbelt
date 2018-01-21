import { customElement, inject, bindable, bindingMode, BindingEngine, containerless } from 'aurelia-framework';

@containerless()
@inject(Element)
@customElement('abt-pagination')
export class BootstrapPaginationCustomElement {

    @bindable({ defaultBindingMode: bindingMode.oneWay }) public totalPages: number = 1;
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public startPage: number = 1;
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public visiblePages: number = 5;
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public hideOnlyOnePage: boolean = true;
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public boundaryLinks: boolean = true;
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public directionLinks: boolean = true;
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public pageVariable: number;
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public totalPagesVariable: number;
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public first: string = 'First';
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public last: string = 'Last';
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public prev: string = 'Previous';
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public next: string = 'Next';
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public loop: boolean = false;

    @bindable({ defaultBindingMode: bindingMode.oneWay }) public click: Function;


    private pagination: Element;
    private paginationItems: Element;
    private pages: string[];

    private onClick(event: Event) {
        if (this.click) {
            this.click({ event: event });
        }
    }

    private afterAttached() {
        this.pages = ['1', '2', '...', '6', '7', '8', '...', '12', '13'];
    }
}
