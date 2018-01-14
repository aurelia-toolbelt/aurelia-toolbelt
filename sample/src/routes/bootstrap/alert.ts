import { inject } from 'aurelia-framework';

// @ts-ignore
import { ToastrService } from 'aurelia-toolbelt';



@inject(ToastrService)
export class Alert {

  private showOrHideAlert = true;

  constructor(private ts2: ToastrService) {
  }


  private showAlert(target: any) {
    console.log('show');
    // return undefined;
  }

  private toggleAlert() {

    this.ts2.success('Toggling alerts', '' , {
      progressBar: true, preventDuplicates: true, positionClass: 'toast-bottom-right'
    });
    this.showOrHideAlert = !this.showOrHideAlert;
  }

}
