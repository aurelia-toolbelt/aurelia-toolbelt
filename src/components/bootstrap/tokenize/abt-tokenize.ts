
import { customElement, inject, bindable, bindingMode, BindingEngine, containerless, processContent, children } from 'aurelia-framework';

// https://stackoverflow.com/questions/44716366/tokenize2-with-default-added-values
// https://stackoverflow.com/questions/45037159/how-do-i-get-text-of-multiselect-tokenize2-control
// https://stackoverflow.com/questions/44452004/is-it-possible-to-show-all-options-in-tokenize2
// https://stackoverflow.com/questions/44624188/show-all-options-in-tokenize2

import 'jquery';
import 'aureliatoolbelt-thirdparty/bootstrap-tokenize2/tokenize2.css';
import 'aureliatoolbelt-thirdparty/bootstrap-tokenize2/tokenize2.js';

@inject(Element)
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
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public noResultsMessageText: string = 'No results matched "%s"';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public zIndexMargin: number = 500;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public tabIndex: number = 0;


  private tokenize: HTMLSelectElement;

  @children('option') private options: Array<HTMLOptionElement>;

  constructor(private element: Element) {
  }


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

  private afterAttached() {

    let index = this.options.length;

    while (index--) {
      this.options[index].innerHTML = this.options[index].innerHTML.trim();
      this.tokenize.appendChild(this.options[index]);
    }

  }
}
