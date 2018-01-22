import { customElement, inject, bindable, bindingMode, BindingEngine, containerless } from 'aurelia-framework';

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

  // @bindable({ defaultBindingMode: bindingMode.oneWay }) public pageVariable: string;
  // @bindable({ defaultBindingMode: bindingMode.oneWay }) public totalPagesVariable: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public first: string = 'First';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public last: string = 'Last';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public prev: string = 'Previous';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public next: string = 'Next';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public loop: boolean = false;

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public click: Function;


  private pagination: Element;
  private paginationItems: Element;
  private pages: number[] = [];

  private onClick(event: Event) {
    if (this.click) {
      this.click({ event: event });
      console.log(event.target);
    }
    return false;
  }

  /*private leftSideVisibleItems(visibleItem: number, selectedItem: number): string[] {
    let left = Math.ceil(visibleItem / 2);
    let leftPages: string[] = [];
    for (let index = 0; index < left; index++) {
      leftPages[index] = 'a';
    }
    if (selectedItem >= left) {
      leftPages[left - 1] = selectedItem.toString();
    } else {
      leftPages[selectedItem - 1] = selectedItem.toString();
    }
    return leftPages;

  }
  private rightSideVisibleItems(visibleItem: number): string[] {
    let right = Math.floor(visibleItem / 2);
    let rightPages: string[] = [];
    for (let index = 0; index < right; index++) {
      rightPages[index] = 'a';
    }
    return rightPages;
  }*/


  private createVisibleItems(visibleItem: number, selectedItem: number, totalPages: number): string[] {
    let items: string[] = [];
    for (let index = 0; index < visibleItem; index++) {
      items[index] = 'a';
    }
    let leftMetric = Math.ceil(visibleItem / 2);
    let rightMetric = Math.floor(visibleItem / 2);

    if (selectedItem < leftMetric) {
      items[selectedItem - 1] = selectedItem.toString();
    }

    if (selectedItem > (totalPages - rightMetric)) {
      items[selectedItem - 1] = selectedItem.toString();
    }


    return items;
  }

  private showLeftDots(selectedItem: number): boolean {
    return selectedItem > 4;
  }
  private showRightDots(selectedItem: number, totalPages: number): boolean {
    return totalPages - 4 > selectedItem;
  }

  private afterAttached() {

    if (this.visiblePages <= 0) {
      throw Error('you are a stupid vicious programmer');
    }

    if (this.visiblePages > this.totalPages) {
      throw Error('you are a stupid vicious programmer');
    }


    let y = this.createVisibleItems(this.visiblePages, this.selectedPage, this.totalPages);

    // let leftSide = this.leftSideVisibleItems(this.visiblePages, this.selectedPage);
    // let rightSide = this.rightSideVisibleItems(this.visiblePages);

    if (this.showGoto) {
      /*if (this.showLeftDots(this.selectedPage)) {
        leftSide[0] = '1';
        leftSide[1] = '2';
        leftSide[2] = '...';
      }
      if (this.showRightDots(this.selectedPage, this.totalPages)) {
        rightSide[rightSide.length - 3] = '...';
        rightSide[rightSide.length - 2] = (this.totalPages - 1).toString();
        rightSide[rightSide.length - 1] = this.totalPages.toString();
      }*/
    }

    let showLeftDots = this.selectedPage > 5;
    let showRightDots = this.totalPages - 5 > this.selectedPage;


    let visiblePagesLeftSide = Math.ceil(((this.visiblePages - (this.showGoto ? 4 : 0)) / 2));
    let visiblePagesRightSide = Math.floor(((this.visiblePages - (this.showGoto ? 4 : 0)) / 2));

    let minBoundary = 1;
    let maxBoundary = 0;

    if (this.selectedPage - visiblePagesLeftSide > 0) {
      minBoundary = this.selectedPage - visiblePagesLeftSide;
    } else {
      maxBoundary = Math.abs(this.selectedPage - visiblePagesLeftSide);
    }

    if (this.selectedPage + visiblePagesRightSide > this.totalPages) {
      maxBoundary = this.totalPages;

      minBoundary -= this.selectedPage + visiblePagesRightSide - this.totalPages - 1;

    } else {
      maxBoundary += this.selectedPage + visiblePagesRightSide;
    }


    let counter = minBoundary;

    while (counter <= maxBoundary) {
      this.pages.push(counter++);
    }

    if (this.showGoto) {
      if (showLeftDots === true) {
        this.pages.unshift(-1);
      }
      if (this.selectedPage > 2) {
        this.pages.unshift(2);
        this.pages.unshift(1);
      }

      if (showRightDots === true) {
        this.pages.push(-1);
      }

      if (this.selectedPage < this.totalPages - 2) {
        this.pages.push(this.totalPages - 1);
        this.pages.push(this.totalPages);
      }


    }
  }
}
