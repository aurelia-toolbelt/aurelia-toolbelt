
import { customElement, bindable, bindingMode, inject, containerless, DOM } from 'aurelia-framework';

@customElement('aut-scrollup')
export class ScrollUpCustomElement {


  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public threshold: number = 150;

  @bindable({ defaultBindingMode: bindingMode.twoWay }) public beforeScrollUp: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public afterScrollUp: Function;

  private checkScrollTop() {
    let elem = document.getElementById('aut-scrollup-button');

    if (document.body.scrollTop > this.threshold || document.documentElement.scrollTop > this.threshold) {
      elem.style.display = 'block';
    } else {
      elem.style.display = 'none';
    }
  }

  private goToUp() {
    this.beforeScrollUp();
    if (!document.body.scroll) {
      window.scrollTo(0, 0);
      this.afterScrollUp();
      return;
    }
    document.body.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    document.documentElement.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this.afterScrollUp();
  }

  private attached() {

    let isMultipleInstanceAvailable = document.getElementsByClassName('aut-scrollup').length > 1;

    if (isMultipleInstanceAvailable) {
      throw Error('You cannot have multiple instances of [aut-scrollup] component, please check your DOM');
    }

    window.onscroll = () => this.checkScrollTop();
  }
}
