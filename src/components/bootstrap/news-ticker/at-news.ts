
import { customElement, inject, bindable, bindingMode } from 'aurelia-framework';

export interface INewsTickerItem {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

@inject(Element)
@customElement('at-news')
export class AtNewsTicker {

  @bindable({ defaultBindingMode: bindingMode.oneWay }) private type: string = 'secondary';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) private title: string = '';

  @bindable({ defaultBindingMode: bindingMode.oneWay }) private visible: number = 3;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) private pause: boolean = false;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) private direction: 'up' | 'down' = 'up';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) private tick: number = 1; // in seconds
  @bindable({ defaultBindingMode: bindingMode.oneWay }) private news: Array<INewsTickerItem> = null;

  @bindable({ defaultBindingMode: bindingMode.oneWay }) private visibleItems: Array<INewsTickerItem> = null;

  private timerHandlerId: any;

  private next: number;

  constructor(private element: Element) {
  }

  private attached() {
    this.visibleItems = this.news.slice(0, this.visible);

    this.next = this.direction === 'up' ? this.visible : this.news.length - 1;

    console.log(this.direction);
    console.log(this.next);

    this.tick = this.tick * 1000;
  }

  private rotateNews(): void {

    console.log(`direction is: ${this.direction}`);

    if (this.direction === 'up') {
      this.visibleItems.shift();
      this.visibleItems.push(this.news[this.next]);

      this.next = this.next < (this.news.length - 1) ? this.next + 1 : 0;

      console.log(`next is: ${this.next}`);

    } else {

      console.log(this.next);

      this.visibleItems.pop();
      this.visibleItems.unshift(this.news[this.next]);

      this.next = this.next > 0 ? this.next - 1 : this.news.length - 1;

    }
  }


  private pauseChanged(new_value: boolean) {

    if (new_value) {
      clearInterval(this.timerHandlerId);
    } else {
      this.timerHandlerId = setInterval(() => this.rotateNews(), this.tick);
    }
  }

  private detached() {
    clearInterval(this.timerHandlerId);
  }

}
