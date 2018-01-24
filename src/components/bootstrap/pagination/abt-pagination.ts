import { customElement, inject, bindable, bindingMode, BindingEngine, containerless, signalBindings } from 'aurelia-framework';



interface IPagination {
  pageNumber: number;
  page: string;
  selected: boolean;
}

@containerless()
@inject(Element)
@customElement('abt-pagination')
export class BootstrapPaginationCustomElement {

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public totalPages: number = 1;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public selectedPage: number = 1;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public visiblePages: number = 1;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public hideOnlyOnePage: boolean = true;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public boundaryLinks: boolean = true;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public directionLinks: boolean = true;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public showGoto: boolean = true;

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public pageTemplate: string = '%s';

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public first: string = 'First';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public last: string = 'Last';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public prev: string = 'Previous';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public next: string = 'Next';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public loop: boolean = false;

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public pageChanged: Function;

  private showNumbers: boolean = false;
  private pagination: Element;
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
          inputElement.remove();
          this.onClick(null, inputElement.value, Number(inputElement.value) - 1, Number(inputElement.value) + 1);
        });
        return false;
      }
    }

    if (selectedPageNumber === 'prev') {
      this.selectedPage--;
      if (this.selectedPage === 0) {
        this.selectedPage = this.totalPages;
      }
    } else if (selectedPageNumber === 'next') {
      this.selectedPage++;
      if (this.selectedPage > this.totalPages) {
        this.selectedPage = 1;
      }
    } else {
      this.selectedPage = Number(selectedPageNumber);
    }

    this.createVisibleItems(this.visiblePages, this.selectedPage, this.totalPages);

    if (this.pageChanged) {
      this.pageChanged({ event: event, selectedPageNumber: selectedPageNumber });
    }
    return false;
  }

  private createVisibleItems(visibleItem: number, selectedItem: number, totalPages: number): void {
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

    let showLeftDots = this.showLeftDots(selectedItem);
    let showRightDots = this.showRightDots(selectedItem, totalPages);

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
        page: items[index] === '...' ? '...' : this.pageTemplate.replace('%s', items[index]),
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

    if (this.visiblePages <= 0) {
      throw Error('The visible pages value should be greater than 0.');
    }

    if (this.visiblePages > this.totalPages) {
      throw Error('The visible pages should always be less than or equal to the total pages.');
    }

    if (this.hideOnlyOnePage && (this.totalPages === 1)) {
      this.boundaryLinks = false;
      this.directionLinks = false;
    }

    this.createVisibleItems(this.visiblePages, this.selectedPage, this.totalPages);

  }
}


