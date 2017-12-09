import { singleton } from 'aurelia-framework';
import * as $ from 'jquery';

@singleton()
export class BlockUiResizeService {
  private arr: Array<Element> = [];
  public update(elem: Element): void {
    this.arr.push(elem);
    for (let index = 0; index < this.arr.length; index++) {
      $(this.arr[index]).resize(x => $(x).block());
    }
  }
  public remove(elem: Element): void {

    const index = this.arr.indexOf(elem);

    if (index > -1) {
      this.arr.splice(index, 1);
    }

  }
}
