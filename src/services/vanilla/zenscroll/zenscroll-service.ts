import { transient, customElement, inject, bindable, bindingMode, observable, DOM, singleton, noView } from 'aurelia-framework';

import * as zenscroll from 'zenscroll';

@singleton()
export class ZenscrollService {
  constructor() {
    DOM.injectStyles(`body, .smooth-container { scroll-behavior: smooth }`);
  }

  public to(element: string | HTMLElement, duration?: number, onDone?: () => void) {
    let elem: HTMLElement;
    if (typeof element === 'string') {
      elem = document.getElementById(element);
      zenscroll.to(elem, duration, onDone);
    } else {
      zenscroll.to(element, duration, onDone);
    }
  }

  public toY(targetY: number, duration?: number, onDone?: () => void) {
    zenscroll.toY(targetY, duration, onDone);
  }

  public intoView(element: string | HTMLElement, duration?: number, onDone?: () => void) {
    let elem: HTMLElement;
    if (typeof element === 'string') {
      elem = document.getElementById(element);
      zenscroll.intoView(elem, duration, onDone);
    } else {
      zenscroll.intoView(element, duration, onDone);
    }
  }

  public center(element: string | HTMLElement, duration?: number, offset?: number, onDone?: () => void) {
    let elem: HTMLElement;
    if (typeof element === 'string') {
      elem = document.getElementById(element);
      zenscroll.center(elem, duration, offset, onDone);
    } else {
      zenscroll.center(element, duration, offset, onDone);
    }
  }

  public stop() {
    zenscroll.stop();
  }

  public moving(): boolean {
    return zenscroll.moving();
  }

  public getY(): number {
    return zenscroll.getY();
  }

  public getTopOf(element: string | HTMLElement): number {
    let elem: HTMLElement;
    if (typeof element === 'string') {
      elem = document.getElementById(element);
      return zenscroll.getTopOf(elem);
    } else {
      return zenscroll.getTopOf(element);
    }
  }

  public createScroller(element: string | HTMLElement, defaultDuration?: number, edgeOffset?: number): any {
    let elem: HTMLElement;
    if (typeof element === 'string') {
      elem = document.getElementById(element);
      return zenscroll.createScroller(elem, defaultDuration, edgeOffset);
    } else {
      return zenscroll.createScroller(element, defaultDuration, edgeOffset);
    }
  }







}
