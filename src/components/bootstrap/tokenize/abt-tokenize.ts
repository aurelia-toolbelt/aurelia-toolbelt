import { customElement, inject, bindable, bindingMode, BindingEngine, containerless } from 'aurelia-framework';

import * as $ from 'jquery';
import './scripts/tokenize2.js';
import './styles/tokenize2.css';

@containerless()
@customElement('abt-tokenize')
export class BootstrapTokenizeCustomElement {

    @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string;

    @bindable({ defaultBindingMode: bindingMode.oneWay }) public dataSource: string = 'select';
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public debounce: number = 0;
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public delimiter: string[] = [','];
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public placeholder: boolean = false;
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public tokensMaxItems: number = 0;
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public tokensAllowCustom: boolean = false;
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public dropdownMaxItems: number = 10;
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public searchMinLength: number = 0;
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public searchFromStart: boolean = true;
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public searchHighlight: boolean = true;
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public displayNoResultsMessage: boolean = false;
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public noResultsMessageText: string = 'No results mached "%s"';
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public zIndexMargin: number = 500;
    @bindable({ defaultBindingMode: bindingMode.oneWay }) public tabIndex: number = 0;

    private tokenize: any;

    private attached() {
        // @ts-ignore
        $(this.tokenize).tokenize2({
            dataSource: this.dataSource,
            debounce: this.debounce,
            delimiter: this.delimiter,
            placeholder: this.placeholder,
            tokensMaxItems: this.tokensMaxItems,
            tokensAllowCustom: this.tokensAllowCustom,
            dropdownMaxItems: this.dropdownMaxItems,
            searchMinLength: this.searchMinLength,
            searchFromStart: this.searchFromStart,
            searchHighlight: this.searchHighlight,
            displayNoResultsMessage: this.displayNoResultsMessage,
            noResultsMessageText: this.noResultsMessageText,
            zIndexMargin: this.zIndexMargin,
            tabIndex: this.tabIndex
        });
    }
}
