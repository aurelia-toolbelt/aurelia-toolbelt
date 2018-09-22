import { inject } from 'aurelia-framework';

// @ts-ignore
import { ToastrService } from 'aurelia-toolbelt';



@inject(ToastrService)
export class Alert {

  private show_countdown_alert = false;
  private secondsRemained: Number = 10;

  private showDismissible = true;

  private show_hide = true;

  constructor(private ts2: ToastrService) {
  }

  private showAlert() {
    this.show_countdown_alert = true;
  }

  private countDownHasChanged(currentCounter: number) {
    this.secondsRemained = currentCounter;
    if (this.secondsRemained === 0) {
      this.secondsRemained = 10;
      this.show_countdown_alert = false;
    }
  }

  private toggleAlert() {
    this.show_hide = !this.show_hide;
  }

  private onShow(target) {
    console.log(target);
    this.ts2.info('Alert event triggered!', 'Hooray', {
      progressBar: true, preventDuplicates: true, positionClass: 'toast-bottom-left'
    });

    // The following line will prevent alert from being shown after toggle
    return false;
  }

}
