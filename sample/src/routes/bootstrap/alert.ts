import { inject } from 'aurelia-framework';

// @ts-ignore
import { ToastrService } from 'aurelia-toolbelt';
import { DOM } from 'aurelia-pal';



@inject(ToastrService)
export class Alert {

  private showDismissible = true;

  private showOrHideAlert = true;

  constructor(private ts2: ToastrService) {
  }


  private showAlert(target: any) {
    console.log('show');
    // return undefined;
  }

  private toggleAlert() {

    this.ts2.info('Toggling alerts', '', {
      progressBar: true, preventDuplicates: true, positionClass: 'toast-bottom-right'
    });
    this.showOrHideAlert = !this.showOrHideAlert;
  }

}
