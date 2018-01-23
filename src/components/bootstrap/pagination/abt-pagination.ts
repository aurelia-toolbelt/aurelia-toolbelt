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

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public click: Function;


  private pagination: Element;
  private paginationItems: Element;
  private pages: IPagination[] = [];

  private onClick(event: Event) {
    if (this.click) {
      this.deactiveItems();
      this.click({ event: event });
      let target = <HTMLAnchorElement>event.target;
      let page = target.innerText.trim();
      let pageNumber = 0;
      if (target.className.indexOf('abt-pagination-item-NaN') > -1) {
        return;
      } else if (target.className.indexOf('abt-pagination-first') > -1) {
        pageNumber = 1;
      } else if (target.className.indexOf('abt-pagination-last') > -1) {
        pageNumber = this.totalPages;
      } else if (target.className.indexOf('abt-pagination-prev') > -1) {
        if (this.selectedPage === 1) {
          if (this.loop) {
            pageNumber = this.totalPages;
          } else {
            pageNumber = 1;
          }
        } else {
          pageNumber = this.getPageNumber(this.selectedPage.toString()) - 1;
        }
      } else if (target.className.indexOf('abt-pagination-next') > -1) {
        if (this.selectedPage === this.totalPages) {
          if (this.loop) {
            pageNumber = 1;
          } else {
            pageNumber = this.totalPages;
          }
        } else {
          pageNumber = this.getPageNumber(this.selectedPage.toString()) + 1;
        }
      } else {
        pageNumber = this.getPageNumber(page);
      }
      this.selectedPage = pageNumber;
      this.pages = this.createVisibleItems(this.visiblePages, pageNumber, this.totalPages);
      // target.parentElement.classList.add('active');

      $(`#abt-pagination-li-item-${pageNumber}`).addClass('active');

      console.log(event.target);
    }
    return false;
  }

  private deactiveItems() {
    let controls = this.pagination.children;
    for (let index = 0; index < controls.length; index++) {
      controls[index].classList.remove('active');
    }
  }

  private getPageNumber(template: string): number {
    let arr = template.split(' ');
    let arrTemplate = this.pageTemplate.split(' ');
    for (let index = 0; index < arrTemplate.length; index++) {
      let value = arrTemplate[index];
      if (value === '%s') {
        return parseInt(arr[index].trim(), 10);
      }
    }
    throw Error('Check your page template maybe have some problem.');
  }

  private createVisibleItems(visibleItem: number, selectedItem: number, totalPages: number): IPagination[] {
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

    let pages: IPagination[] = [];
    for (let index = 0; index < items.length; index++) {
      pages.push({
        page: items[index],
        selected: items[index] === selectedItem.toString()
      });
    }


    return pages;
  }

  private showLeftDots(selectedItem: number): boolean {
    return selectedItem > 5;
  }
  private showRightDots(selectedItem: number, totalPages: number): boolean {
    return totalPages - 5 > selectedItem;
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


    this.pages = this.createVisibleItems(this.visiblePages, this.selectedPage, this.totalPages);

    // this.pagination.getElementsByClassName(`abt-pagination-li-item-${this.selectedPage}`)[0].classList.add('active');


  }



}


