import { inject } from 'aurelia-framework';

// @ts-ignore
import { ToastrService, ZenscrollService, CommonCssService, BootstrapTypographyService } from 'aurelia-toolbelt';



@inject(ToastrService, ZenscrollService, CommonCssService, BootstrapTypographyService)
export class Alert {

  private showOrHideAlert = true;

  constructor(private ts2: ToastrService, a1, a2, a3) {
    console.log(a1);
    console.log(a2);
    console.log(a3);

  }


  private showAlert(target: any) {
    console.log('show');
    // return undefined;
  }

  private toggleAlert() {

    this.ts2.success('Toggling alerts', '', {
      progressBar: true, preventDuplicates: true, positionClass: 'toast-bottom-right'
    });
    this.showOrHideAlert = !this.showOrHideAlert;
  }

}
