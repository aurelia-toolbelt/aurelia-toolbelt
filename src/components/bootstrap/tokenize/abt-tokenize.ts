
import { customElement, inject, bindable, bindingMode, BindingEngine, containerless, processContent, children } from 'aurelia-framework';

// https://stackoverflow.com/questions/44716366/tokenize2-with-default-added-values
// https://stackoverflow.com/questions/45037159/how-do-i-get-text-of-multiselect-tokenize2-control
// https://stackoverflow.com/questions/44452004/is-it-possible-to-show-all-options-in-tokenize2

import 'jquery';
import 'aureliatoolbelt-thirdparty/bootstrap-tokenize2/tokenize2.css';
import 'aureliatoolbelt-thirdparty/bootstrap-tokenize2/tokenize2.js';
import { JsTools } from '../../../utilities/purejs/jsTools';

@inject(Element, JsTools)
@customElement('abt-tokenize')
export class BootstrapTokenizeCustomElement {

  @bindable({ defaultBindingMode: bindingMode.oneTime }) public id: string;

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public debounce: number | string = 0;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public delimiter: string[] = [','];
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public placeholder: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public tokensMaxItems: number | string = 0;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public tokensAllowCustom: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public dropdownMaxItems: number | string = 10;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public searchMinLength: number | string = 0;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public searchFromStart: boolean | string = true;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public searchHighlight: boolean | string = true;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public showItemsOnClick: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public displayNoResultsMessage: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public noResultsMessageText: string = 'No results matched "%s"';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public zIndexMargin: number | string = 500;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public tabIndex: number | string = 0;

  @bindable({ defaultBindingMode: bindingMode.twoWay }) public dataSource: string | Function;

  private tokenize: HTMLSelectElement;
  private tokenizeTemplate: Element;

  @children('option') private options: Array<HTMLOptionElement>;

  constructor(private element: Element, private jsTools: JsTools) {
  }

  private afterAttached() {

    this.debounce = Number(this.debounce);
    let placeholder = (this.placeholder === '' && this.tokenizeTemplate.hasAttribute('placeholder')) || this.placeholder.toString() === 'true';
    this.tokensMaxItems = Number(this.tokensMaxItems);
    let tokensAllowCustom = (this.tokensAllowCustom === '' && this.tokenizeTemplate.hasAttribute('tokens-allow-custom'))
      || this.tokensAllowCustom.toString() === 'true';
    this.dropdownMaxItems = Number(this.dropdownMaxItems);
    this.searchMinLength = Number(this.searchMinLength);
    let searchFromStart = (this.searchFromStart === '' && this.tokenizeTemplate.hasAttribute('search-from-start'))
      || this.searchFromStart.toString() === 'true';
    let searchHighlight = (this.searchHighlight === '' && this.tokenizeTemplate.hasAttribute('search-highlight'))
      || this.searchHighlight.toString() === 'true';
    let showItemsOnClick = (this.showItemsOnClick === '' && this.tokenizeTemplate.hasAttribute('show-items-on-click'))
      || this.showItemsOnClick.toString() === 'true';
    let displayNoResultsMessage = (this.displayNoResultsMessage === '' && this.tokenizeTemplate.hasAttribute('display-no-results-message'))
      || this.displayNoResultsMessage.toString() === 'true';
    this.zIndexMargin = Number(this.zIndexMargin);
    this.tabIndex = Number(this.tabIndex);

    let ds = null;
    // dataSource = 'select'
    if (this.options) {
      let index = this.options.length;
      while (index--) {
        this.options[index].innerHTML = this.options[index].innerHTML.trim();
        this.tokenize.appendChild(this.options[index]);
      }
      ds = 'select';
    }
    // dataSource = url
    if (!this.options && this.jsTools.isString(this.dataSource)) {
      ds = this.dataSource;
    }
    // dataSource = function
    if (this.jsTools.isFunction(this.dataSource)) {
      ds = null;
    }
    // https://api.myjson.com/bins/1h4qe9
    // http://www.mocky.io/v2/5a75819e2e00006c006ab1a1

    // @ts-ignore
    $(this.tokenize).tokenize2({
      dataSource: ds != null ? ds : (term: any, object: any) => {
        let items: any[] = [];
        // @ts-ignore
        let filterd = this.dataSource({ term: term });
        $.each(filterd, function (_k, v) {
          items.push(v);
        });
        let data = [items];
        object.trigger('tokenize:dropdown:fill', data);
      },
      debounce: this.debounce,
      delimiter: this.delimiter,
      placeholder: placeholder,
      tokensMaxItems: this.tokensMaxItems,
      tokensAllowCustom: tokensAllowCustom,
      dropdownMaxItems: this.dropdownMaxItems,
      searchMinLength: this.searchMinLength,
      searchFromStart: searchFromStart,
      searchHighlight: searchHighlight,
      displayNoResultsMessage: displayNoResultsMessage,
      noResultsMessageText: this.noResultsMessageText,
      zIndexMargin: this.zIndexMargin,
      tabIndex: this.tabIndex
    });


    if (this.showItemsOnClick) {
      // @ts-ignore
      $(this.tokenize).on('tokenize:select', () => (e: Event, routedEvent: boolean) => {
        $(this.tokenize).trigger('tokenize:search', '');
      });
    }

  }
}
