
import { customElement, inject, bindable, bindingMode, DOM, TaskQueue } from 'aurelia-framework';

import shave from './shave';
import { CssAnimator } from 'aurelia-animator-css';
// import ResizeObserver from 'resize-observer-polyfill';

export interface INewsTickerItem {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

@inject(Element, TaskQueue, CssAnimator)
@customElement('at-news')
export class AtNewsTicker {

  @bindable({ defaultBindingMode: bindingMode.oneWay }) private type = 'secondary';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) private title = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) private rtl = false;

  @bindable({ defaultBindingMode: bindingMode.oneTime }) private visible = 3;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) private direction: 'up' | 'down' = 'up';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) private tick = 1; // in seconds
  @bindable({ defaultBindingMode: bindingMode.oneWay }) private news: Array<INewsTickerItem> = null;

  @bindable({ defaultBindingMode: bindingMode.oneWay }) private pause = false;

  private next: number;
  private timerHandlerId: any;
  private newsDescription: HTMLDivElement;
  private newsPanel: HTMLDivElement;
  private visibleItems: Array<INewsTickerItem> = null;

  constructor(private element: Element, private taskQueue: TaskQueue, private animator: CssAnimator) { }

  private attached() {

    this.visibleItems = this.news.slice(0, this.visible);
    this.newsDescription.innerText = this.visibleItems[0].description;

    this.next = this.direction === 'up' ? this.visible : this.news.length - 1;

    this.tick = this.tick * 1000;

    DOM.injectStyles(`:root {
      --at-latest-news: var(--${this.type})
    }`, null, null, 'at-latest-news-variables');

    this.taskQueue.queueTask(() => this.afterAttached());
  }

  private afterAttached() {

    if (this.visible === 1) {
      window.onresize = () => {
        console.log('windows: shaving ... ');
        shave(this.newsDescription, this.arrowHeight, { character: ' ...' });
      };
      shave(this.newsDescription, this.arrowHeight, { character: ' ...' });
    }
    // const ro = new ResizeObserver((entries, observer) => {
    // shave(this.newsDescription, topWidth + BottomWidth, { character: ' ...' });
    // });
    // ro.observe(this.newsDescription);
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

    // for single item visible
    this.newsDescription.innerText = this.visibleItems[0].description;
    this.animator.addClass(this.newsDescription, 'background-animation').then(() => {
      this.animator.removeClass(this.newsDescription, 'background-animation');
    });
    shave(this.newsDescription, this.arrowHeight, { character: ' ...' });
  }

  private get arrowHeight() {
    let height = Number(window.getComputedStyle(this.newsPanel, ':after').getPropertyValue('border-top-width').replace('px', ''))
      + Number(window.getComputedStyle(this.newsPanel, ':after').getPropertyValue('border-bottom-width').replace('px', ''));

    return height || 34;
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
