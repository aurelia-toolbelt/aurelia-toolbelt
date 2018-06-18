import { inject } from 'aurelia-framework';

// @ts-ignore
import { ToastrService } from 'aurelia-toolbelt';



@inject(ToastrService)
export class Alert {

  private showDismissible = true;

  private show_hide = true;

  constructor(private ts2: ToastrService) {
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
