import { customElement, containerless, bindable, bindingMode, TaskQueue } from 'aurelia-framework';
import { inject } from 'aurelia-dependency-injection';


import * as $ from 'jquery';

@inject(Element, TaskQueue)
// @containerless()
@customElement('abt-alert')
export class BootstrapAlert {

  @bindable({ defaultBindingMode: bindingMode.oneTime }) public size: string = 'md';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public type: string = 'primary';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public animate: boolean | string = true;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public countdown: number | string = 0;


  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public dismissible: boolean | string = false;

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public showAlert: boolean = true;

  @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsShow: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsShown: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsHide: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsHidden: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsClose: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public bsClosed: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public countdownChanged: Function;


  private alert: HTMLDivElement;

  private isHover: boolean;
  private countdown_timer: any;
  private local_countdown: number;

  constructor(private element: Element, private taskQueue: TaskQueue) {
  }

  private attached() {

    const onlyDismissibleAttribute = (this.dismissible === '' && this.element.hasAttribute('dismissible'));
    this.dismissible = onlyDismissibleAttribute || this.dismissible.toString() === 'true';

    const onlyAnimateAttribute = (this.animate === '' && this.element.hasAttribute('animate'));
    this.animate = onlyAnimateAttribute || this.animate === 'true' || this.animate === true;

    this.countdown = Number(this.countdown);

    if (this.bsClose) {
      $(alert).on('close.bs.alert', () => {
        if (this.bsClose) {
          this.bsClose();
        }
      });
    }

    if (this.bsClosed) {
      $(alert).on('closed.bs.alert', () => {
        if (this.bsClosed) {
          this.bsClosed();
        }
      });
    }

    this.taskQueue.queueTask(() => this.afterAttached());

  }

  private afterAttached() {

    // negative count downs is not acceptable and zero means till eternity
    if (this.countdown > 0) {

      this.alert.addEventListener('mouseover', () => { this.isHover = true; });
      this.alert.addEventListener('mouseout', () => { this.isHover = false; });

      // tslint:disable-next-line:triple-equals
      if (this.showAlert == true) {
        this.local_countdown = Number(this.countdown);
        this.countdown_timer = setInterval(() => this.counter(), 1000);
      }
    }
  }

  private counter() {

    if (this.isHover) {
      return;
    }

    this.local_countdown--;
    if (this.countdownChanged) { this.countdownChanged({ current: this.local_countdown }); }

    if (this.local_countdown === 0) {

      clearInterval(this.countdown_timer);

      this.showAlert = false;                          // signals showAlertChanged
    }
  }


  private async showAlertChanged(newValue: boolean) {

    // the alert changes its state from hidden to show and it contains a countdown value, thus should start a timer
    if (newValue && this.countdown > 0) {

      this.local_countdown = Number(this.countdown);  //  resets the local_countdown for further show-alert = true
      this.countdown_timer = setInterval(() => this.counter(), 1000);
    }

    if (newValue) {

      let continueShow = true;

      if (this.bsShow) {
        continueShow = (await this.bsShow({ target: this.alert }));
      }

      continueShow = continueShow === undefined || continueShow === null ? true : continueShow;

      if (!continueShow) {
        this.showAlert = !newValue;
        return;
      }

      if (this.animate) {
        $(this.alert).fadeIn();
      } else {
        $(this.alert).show();
      }

      if (this.bsShown) {
        this.bsShown({ target: this.alert });
      }

    } else {

      let continueHide = true;

      if (this.bsHide) {
        continueHide = (await this.bsHide({ target: this.alert }));
      }

      continueHide = continueHide === undefined || continueHide === null ? true : continueHide;

      if (!continueHide) {
        this.showAlert = !newValue;
        return;
      }

      if (this.animate) {
        $(this.alert).fadeOut();
      } else {
        $(this.alert).hide();
      }

      // clears the interval, since the alert is already hidden so there is no need for a timer.
      clearInterval(this.countdown_timer);

      if (this.bsHidden) {
        this.bsHidden({ target: this.alert });
      }

    }

  }

  private detached() {
    // this is necessary for those alerts with countdown that have not reached their time limit
    clearInterval(this.countdown_timer);

    $(this.alert).alert('close');
    $(this.alert).alert('dispose');
  }

}
