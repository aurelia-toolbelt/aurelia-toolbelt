import { singleton } from 'aurelia-framework';
import * as $ from 'jquery';

@singleton()
export class BlockUiResizeService {
  private arr: Array<[Element, any]> = [];
  public add(elem: Element, option: any): void {
    this.arr.push([elem, option]);
    console.log(elem);
    for (let index = 0; index < this.arr.length; index++) {
      $(window).resize(() => {
        if (this.arr[index]) {
          $(this.arr[index][0]).block(option);
        }
      });
    }
  }
  public remove(_elem: Element, _option: any): void {
    this.arr = [];
    /*console.log(this.arr.length);
    const index = this.arr.indexOf([elem, option]);

    if (index > -1) {
      this.arr.splice(index, 1);
    }
    console.log(this.arr.length);*/
  }
}
