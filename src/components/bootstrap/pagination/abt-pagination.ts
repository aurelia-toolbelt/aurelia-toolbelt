import { customElement, inject, bindable, bindingMode, BindingEngine, containerless, signalBindings } from 'aurelia-framework';



interface IPagination {
  pageNumber: number;
  page: string;
  selected: boolean;
}

@inject(Element)
@customElement('abt-pagination')
export class BootstrapPaginationCustomElement {

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public totalPages: number | string = 1;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public selectedPage: number | string = 1;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public visiblePages: number | string = 1;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public hideOnlyOnePage: boolean | string = true;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public boundaryLinks: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public directionLinks: boolean | string = true;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public showGoto: boolean | string = false;

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public template: string = '%s';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public id: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public size: string = 'md';

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public firstText: string = 'First';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public firstIcon: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public lastText: string = 'Last';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public lastIcon: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public prevText: string = 'Previous';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public prevIcon: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public nextText: string = 'Next';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public nextIcon: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public loop: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public pageChanged: Function;

  private showNumbers: boolean = false;
  private pagination: Element;
  private paginationTemplate: Element;
  private pages: IPagination[] = [];


  private createInput(value: number, min: number, max: number, height: number): HTMLInputElement {
    let input = <HTMLInputElement>document.createElement('input');
    input.id = 'abt-pagination-goto-item';
    input.type = 'number';
    input.classList.add('form-control');
    input.value = value.toString();
    input.min = min.toString();
    input.max = max.toString();
    input.style.height = height.toString() + 'px';
    return input;
  }

  private onClick(event: Event, selectedPageNumber: number | string, prevPageNumber: number | string, nextPageNumber: number | string) {
    if (!Number(selectedPageNumber)) {
      if (!(selectedPageNumber === 'prev' || selectedPageNumber === 'next' || event === null)) {
        let currentElement = <HTMLAnchorElement>event.target;
        let parentElement = currentElement.parentElement;
        let elementHeight = Number(parentElement.offsetHeight);
        currentElement.remove();
        let inputElement = this.createInput(Number(prevPageNumber) + 1, Number(prevPageNumber) + 1, Number(nextPageNumber) - 1, elementHeight);
        parentElement.appendChild(inputElement);
        $(inputElement).focus();
        $(inputElement).blur(() => {
          if (inputElement) {
            inputElement.remove();
            this.onClick(null, inputElement.value, Number(inputElement.value) - 1, Number(inputElement.value) + 1);
          }
        });
        return false;
      }
    }

    if (selectedPageNumber === 'prev') {
      this.selectedPage = Number(this.selectedPage) - 1;
      if (this.selectedPage === 0) {
        this.selectedPage = this.totalPages;
      }
    } else if (selectedPageNumber === 'next') {
      this.selectedPage = Number(this.selectedPage) + 1;
      if (this.selectedPage > this.totalPages) {
        this.selectedPage = 1;
      }
    } else {
      this.selectedPage = Number(selectedPageNumber);
    }
    this.visiblePages = Number(this.visiblePages);
    this.selectedPage = Number(this.selectedPage);
    this.totalPages = Number(this.totalPages);

    this.createVisibleItems(this.visiblePages, this.selectedPage, this.totalPages);

    if (this.pageChanged) {
      this.pageChanged({ event: event, selectedPageNumber: this.selectedPage });
    }
    return false;
  }

  private createVisibleItems(visibleItem: number, selectedItem: number, totalPages: number): void {
    selectedItem = selectedItem <= 0 ? 1 : selectedItem;
    let items: string[] = [];
    for (let index = 0; index < visibleItem; index++) {
      items[index] = '-1';
    }
    let leftSide = Math.ceil(visibleItem / 2);
    let rightSide = Math.floor(visibleItem / 2);

    if (selectedItem < leftSide) {
      items[selectedItem - 1] = selectedItem.toString();
    } else if (selectedItem > (totalPages - rightSide)) {
      items[(selectedItem - totalPages) + (items.length - 1)] = selectedItem.toString();
    } else {
      items[leftSide - 1] = selectedItem.toString();
    }

    let showLeftDots = this.showLeftDots(selectedItem) && this.visiblePages >= 7;
    let showRightDots = this.showRightDots(selectedItem, totalPages) && this.visiblePages >= 7;
    this.totalPages = Number(this.totalPages);
    if (showLeftDots && this.showGoto) {
      items[0] = '1';
      items[1] = '2';
      items[2] = '...';
    }
    if (showRightDots && this.showGoto) {
      items[items.length - 3] = '...';
      items[items.length - 2] = (this.totalPages - 1).toString();
      items[items.length - 1] = this.totalPages.toString();
    }

    let isBefore: boolean = true;
    let currentItem = selectedItem;
    for (let index = 0; index < items.length; index++) {
      if (items[index] === selectedItem.toString()) {
        isBefore = false;
      }
      if (items[index] === '-1' && !isBefore) {
        currentItem += 1;
        items[index] = currentItem.toString();
      }
    }

    let isAfter: boolean = true;
    let currentItemReverse = selectedItem;
    for (let index = items.length; index--;) {
      if (items[index] === selectedItem.toString()) {
        isAfter = false;
      }
      if (items[index] === '-1' && !isAfter) {
        currentItemReverse -= 1;
        items[index] = currentItemReverse.toString();
      }
    }

    this.pages = [];

    for (let index = 0; index < items.length; index++) {
      this.pages.push({
        page: items[index] === '...' ? '...' : this.template.replace('%s', items[index]),
        selected: items[index] === selectedItem.toString(),
        pageNumber: Number(items[index])
      });
    }
  }

  private showLeftDots(selectedItem: number): boolean {
    return selectedItem > 5;
  }
  private showRightDots(selectedItem: number, totalPages: number): boolean {
    return totalPages - 5 >= selectedItem;
  }

  private afterAttached() {

    this.totalPages = Number(this.totalPages);
    this.selectedPage = Number(this.selectedPage);
    this.visiblePages = Number(this.visiblePages);

    if (this.visiblePages <= 0) {
      throw Error('The visible pages value should be greater than 0.');
    }

    if (this.visiblePages > this.totalPages) {
      throw Error('The visible pages should always be less than or equal to the total pages.');
    }


    let hideOnlyOnePage = (this.hideOnlyOnePage === '' && this.paginationTemplate.hasAttribute('hide-only-one-page'))
      || this.hideOnlyOnePage.toString() === 'true';
    let boundaryLinks = (this.boundaryLinks === '' && this.paginationTemplate.hasAttribute('boundary-links')) || this.boundaryLinks.toString() === 'true';
    let directionLinks = (this.directionLinks === '' && this.paginationTemplate.hasAttribute('direction-links')) || this.directionLinks.toString() === 'true';
    let showGoto = (this.showGoto === '' && this.paginationTemplate.hasAttribute('show-goto')) || this.showGoto.toString() === 'true';
    let loop = (this.loop === '' && this.paginationTemplate.hasAttribute('loop')) || this.loop.toString() === 'true';

    if (this.size === 'lg') {
      this.pagination.classList.add('pagination-lg');
    } else if (this.size === 'sm') {
      this.pagination.classList.add('pagination-sm');
    } else {
      this.pagination.classList.remove('pagination-sm');
      this.pagination.classList.remove('pagination-lg');
    }

    if (this.hideOnlyOnePage && (this.totalPages === 1)) {
      this.boundaryLinks = false;
      this.directionLinks = false;
    }

    this.createVisibleItems(this.visiblePages, this.selectedPage, this.totalPages);

  }
}


