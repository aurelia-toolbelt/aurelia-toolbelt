
import { customElement, inject, bindable, bindingMode, BindingEngine, containerless, processContent, children } from 'aurelia-framework';

import 'jquery';
// import 'aureliatoolbelt-thirdparty/bootstrap-tokenize2/tokenize2.css';
import 'aureliatoolbelt-thirdparty/bootstrap-tokenize2/tokenize2.js';
import { JsTools } from '../../../utilities/vanilla/jsTools';

export interface ITokenizeItem {
  text: string;
  value: string;
  force?: boolean;
}

@inject(Element, JsTools, BindingEngine)
@customElement('abt-tokenize')
export class BootstrapTokenizeCustomElement {

  @bindable({ defaultBindingMode: bindingMode.oneTime }) public id: string = null;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public debounce: number | string = 0;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public delimiter: string[] = [','];
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public placeholder: string = null;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public tokensMaxItems: number | string = 0;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public tokensAllowCustom: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public dropdownMaxItems: number | string = 10;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public searchMinLength: number | string = 0;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public searchFromStart: boolean | string = true;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public searchHighlight: boolean | string = true;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public showOnClick: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public displayNoResultsMessage: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public noResultsMessageText: string = 'No results matched "%s"';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public zIndexMargin: number | string = 500;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public tabIndex: number | string = 0;

  @bindable({ defaultBindingMode: bindingMode.twoWay }) public dataSource: string | Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public selectedTokens: Array<ITokenizeItem>;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public load: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public clear: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public remap: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public select: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public deselect: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public search: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public paste: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public dropdownUp: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public dropdownDown: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public dropdownClear: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public dropdownShow: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public dropdownHide: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public dropdownFill: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public dropdownItemAdd: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public keypress: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public keydown: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public keyup: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public reorder: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public add: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public remove: Function;

  private tokenize: HTMLSelectElement;
  private tokenizeTemplate: Element;

  @children('option') private options: Array<HTMLOptionElement>;

  private subscription: any;

  constructor(private element: Element, private jsTools: JsTools, private bindingEngine: BindingEngine) {
  }

  private bind() {
    if (this.selectedTokens) {
      this.subscription = this.bindingEngine.collectionObserver(this.selectedTokens)
        .subscribe(x => {
          let item = x[0];
          if (item) {
            if (item.removed.length) {
              let removed = <Array<ITokenizeItem>>item.removed;
              for (let index = 0; index < removed.length; index++) {
                $(this.tokenize).trigger('tokenize:tokens:remove', removed[index].value);
              }
            } else {
              $(this.tokenize).trigger('tokenize:tokens:add', [this.selectedTokens[item.index].value,
              this.selectedTokens[item.index].text, this.selectedTokens[item.index].force || true]);
            }
          }
        });
    }
  }

  private detached() {
    this.subscription = null;
  }

  private afterAttached() {

    if (this.id) {
      this.tokenizeTemplate.setAttribute('id', `abt-tokenize-${this.id}`);
    }

    this.debounce = Number(this.debounce);
    this.tokensAllowCustom = (this.tokensAllowCustom === '' && this.tokenizeTemplate.hasAttribute('tokens-allow-custom'))
      || this.tokensAllowCustom.toString() === 'true';

    // Maybe Tokenize2 has bug for this. It calculate one item more.
    this.dropdownMaxItems = Number(this.dropdownMaxItems) <= 0 ? 0 : (Number(this.dropdownMaxItems) - 1);

    this.searchMinLength = Number(this.searchMinLength);
    this.searchFromStart = (this.searchFromStart === '' && this.tokenizeTemplate.hasAttribute('search-from-start'))
      || this.searchFromStart.toString() === 'true';
    this.searchHighlight = (this.searchHighlight === '' && this.tokenizeTemplate.hasAttribute('search-highlight'))
      || this.searchHighlight.toString() === 'true';
    this.showOnClick = (this.showOnClick === '' && this.tokenizeTemplate.hasAttribute('show-on-click'))
      || this.showOnClick.toString() === 'true';
    this.displayNoResultsMessage = (this.displayNoResultsMessage === '' && this.tokenizeTemplate.hasAttribute('display-no-results-message'))
      || this.displayNoResultsMessage.toString() === 'true';
    this.zIndexMargin = Number(this.zIndexMargin);
    this.tabIndex = Number(this.tabIndex);
    this.tokensMaxItems = Number(this.tokensMaxItems) || 0;

    $(this.tokenize).on('tokenize:load', () => {
      if (this.load) {
        this.load();
      }
    });
    $(this.tokenize).on('tokenize:clear', () => {
      if (this.clear) {
        this.clear();
      }
    });
    $(this.tokenize).on('tokenize:remap', () => {
      if (this.remap) {
        this.remap();
      }
    });
    $(this.tokenize).on('tokenize:select', () => {
      if (this.select) {
        this.select();
      }
    });

    $(this.tokenize).on('tokenize:deselect', () => {
      if (this.deselect) {
        this.deselect();
      }
    });
    $(this.tokenize).on('tokenize:search', (e, value) => {
      if (this.search) {
        this.search({ e: e, value: value });
      }
    });
    $(this.tokenize).on('tokenize:paste', () => {
      if (this.paste) {
        this.paste();
      }
    });
    $(this.tokenize).on('tokenize:dropdown:up', () => {
      if (this.dropdownUp) {
        this.dropdownUp();
      }
    });
    $(this.tokenize).on('tokenize:dropdown:down', () => {
      if (this.dropdownDown) {
        this.dropdownDown();
      }
    });
    $(this.tokenize).on('tokenize:dropdown:clear', () => {
      if (this.dropdownClear) {
        this.dropdownClear();
      }
    });
    $(this.tokenize).on('tokenize:dropdown:show', () => {
      if (this.dropdownShow) {
        this.dropdownShow();
      }
    });
    $(this.tokenize).on('tokenize:dropdown:hide', () => {
      if (this.dropdownHide) {
        this.dropdownHide();
      }
    });
    $(this.tokenize).on('tokenize:dropdown:fill', (e, items) => {
      if (this.dropdownFill) {
        this.dropdownFill({ e: e, items: items });
      }
    });
    $(this.tokenize).on('tokenize:dropdown:itemAdd', (e, item) => {
      if (this.dropdownItemAdd) {
        this.dropdownItemAdd({ e: e, item: item });
      }
    });
    $(this.tokenize).on('tokenize:keypress', (e, routedEvent) => {
      if (this.keypress) {
        this.keypress({ e: e, routedEvent: routedEvent });
      }
    });
    $(this.tokenize).on('tokenize:keydown', (e, routedEvent) => {
      if (this.keydown) {
        this.keydown({ e: e, routedEvent: routedEvent });
      }
    });
    $(this.tokenize).on('tokenize:keyup', (e, routedEvent) => {
      if (this.keyup) {
        this.keyup({ e: e, routedEvent: routedEvent });
      }
    });
    $(this.tokenize).on('tokenize:tokens:reorder', () => {
      if (this.reorder) {
        this.reorder();
      }
    });

    $(this.tokenize).on('tokenize:tokens:add', (e, value, text, force) => {
      if (this.selectedTokens) {
        let found = this.selectedTokens.findIndex(x => x.value === value) > -1;
        if (!found) {
          this.selectedTokens.push({ text: text, value: value });
        }
      }
      if (this.add) {
        this.add({ e: e, value: value, text: text, force: force });
      }
    });
    $(this.tokenize).on('tokenize:tokens:remove', (e, value) => {
      if (this.selectedTokens) {
        let index = this.selectedTokens.findIndex(x => x.value === value);
        if (index > -1) {
          this.selectedTokens.splice(index, 1);
        }
      }
      if (this.remove) {
        this.remove({ e: e, value: value });
      }
    });

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

    if (this.showOnClick) {
      // @ts-ignore
      $(this.tokenize).on('tokenize:select', (e: Event, routedEvent: boolean) => {
        $(this.tokenize).trigger('tokenize:search', '');
      });
    }
  }
}
