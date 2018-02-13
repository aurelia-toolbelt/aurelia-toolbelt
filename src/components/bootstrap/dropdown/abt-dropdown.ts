import { customElement, inject, containerless, bindable, bindingMode, children, Disposable, BindingEngine } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { BootstrapDropdownSelectedItemChanged } from './abt-dropdown-selected-item-changed';


import * as $ from 'jquery';
import { Uuid } from '../../../utilities/vanilla/uuid';

// export type BoundaryType = 'viewport' | 'window' | 'scrollParent';

@inject(Element, EventAggregator, Uuid)
// @containerless()
@customElement('abt-dropdown')
export class BootstrapDropDown {

  @bindable({ defaultBindingMode: bindingMode.oneTime }) public alignRight: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public boundary: string | Element = 'scrollParent';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public type: string = 'primary';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public offset: string | number = 0;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public flip: boolean = true;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public size: string = 'md';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public placement: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public split: boolean | string = false;

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public disabled: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public menuClass: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public menuStyle: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public title: string = '';

  @bindable({ defaultBindingMode: bindingMode.twoWay }) public value: any;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public matcher: any;


  @bindable({ defaultBindingMode: bindingMode.twoWay }) public click: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public changed: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsShow: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsShown: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsHide: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsHidden: Function;

  private id: any;
  private isBusy: boolean = false;
  private placementClass: string = '';

  private itemsValuesOrModels: Array<any> = [];

  private task: Promise<void> | null = null;
  private subscription: Disposable | null = null;

  private dropdown: any;

  constructor(private element: Element, private ea: EventAggregator, uuid: Uuid) { // , private bindingEngine: BindingEngine) {
    this.id = uuid.Uuidv4ForId();
  }



  // #region click for button not dropdown

  private onClicked(event: any) {

    event.preventDefault();

    if (!this.click || this.disabled) {
      return;
    }

    if (this.task) {
      return;
    }

    this.isBusy = true;

    this.task = Promise.resolve(this.click({ event: event, target: this.element }))
      .then(
      () => this.clickCompleted(),
      () => this.clickCompleted()
      );
  }

  private clickCompleted() {
    this.task = null;
    this.isBusy = false;
  }

  private disposeSubscription() {
    if (this.subscription !== null) {
      this.subscription.dispose();
      this.subscription = null;
    }
  }

  // #endregion

  private attached() {

    // const onlySplitAttribute = (this.split === '' && this.element.hasAttribute('split'));
    this.split = (this.split === '' && this.element.hasAttribute('split')) || this.split.toString() === 'true';
    // const onlyAlignRightAttribute = (this.alignRight === '' && this.element.hasAttribute('align-right'));
    this.alignRight = (this.alignRight === '' && this.element.hasAttribute('align-right')) || this.alignRight.toString() === 'true';

    this.element.children.item(0).setAttribute('data-id', this.id);

    switch (this.placement) {
      case 'top':
        this.placementClass = 'dropup';
        break;
      case 'right':
        this.placementClass = 'dropright';
        break;
      case 'left':
        this.placementClass = 'dropleft';
        break;
      default:
        this.placementClass = '';
        break;
    }

  }

  private bind() {

    // this.element.children.item(0).setAttribute('data-id', this.id);

    // bound to nothing
    // if (this.value === undefined) {
    //   return;
    // }

    this.ea.subscribe(BootstrapDropdownSelectedItemChanged, (changed: BootstrapDropdownSelectedItemChanged) => {

      // not me
      if (changed.parentId !== this.id) {
        return;
      }

      // add to the itemsValueOrModel at child's attached time
      if (!changed.isValueChanged) {
        this.itemsValuesOrModels.push({ value: changed.selectedItem, text: changed.selectedText });
        return;
      }

      this.value = changed.selectedItem;

    });
  }

  private afterAttached() {

    $(this.dropdown).dropdown();

    if (this.bsShow) {
      // $(`#${this.id}`).on('show.bs.dropdown', this.bsShow );
      $(this.dropdown).on('show.bs.dropdown', () => {
        if (this.bsShow) {
          this.bsShow();
        }
      });
    }

    if (this.bsShown) {
      // $(`#${this.id}`).on('shown.bs.dropdown', this.bsShown );
      $(this.dropdown).on('shown.bs.dropdown', () => {
        if (this.bsShown) {
          this.bsShown();
        }
      });
    }

    if (this.bsHide) {
      // $(`#${this.id}`).on('hide.bs.dropdown', this.bsHide );
      $(this.dropdown).on('hide.bs.dropdown', () => {
        if (this.bsHide) {
          this.bsHide();
        }
      });
    }

    if (this.bsHidden) {
      // $(`#${this.id}`).on('hidden.bs.dropdown', this.bsHidden);
      $(this.dropdown).on('hidden.bs.dropdown', () => {
        if (this.bsHidden) {
          this.bsHidden();
        }
      });
    }


    if (this.value !== undefined) {
      this.valueChanged(this.value);
    }
  }

  private valueChanged(newValue: any) {

    let hasMatcher = (this.matcher !== undefined && this.matcher !== null);

    let found = hasMatcher
      ? this.itemsValuesOrModels.find(x => {
        if (x.value === null || newValue === null) {
          return x.value === newValue;
        }

        return this.matcher(x.value, newValue);
      })
      : this.itemsValuesOrModels.find(x => x.value === newValue);

    if (!found) {
      return;
    }

    this.title = found.text;

    // selected changed item event
    if (this.changed) {
      this.changed({ selected: newValue });
    }
  }

  private detached() {
    this.task = null;
    $(this.dropdown).off('show.bs.tab');
    $(this.dropdown).off('shown.bs.tab');
    $(this.dropdown).off('hide.bs.tab');
    $(this.dropdown).off('hidden.bs.tab');
    $(this.dropdown).dropdown('dispose');
  }

}
