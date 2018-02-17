// import { DialogService, DialogController } from 'aurelia-dialog';

import { inject } from 'aurelia-framework';

// @inject(DialogService)
export class BootstrapModalDemo {


  private showModal = false;


  // constructor(private ds: DialogService) {

  // }

  // private openModal() {

  //   return new Promise((resolve, reject) => {

  //     this.ds.open({
  //       viewModel: 'routes/bootstrap/test-dialog.js',
  //       view: 'routes/bootstrap/test-dialog.html',
  //       model: { message: 'Hello Modal Integration' }
  //     }).whenClosed(res => {
  //       alert(res.wasCancelled);
  //     });
  //   });
  // }

  private showEvent() {
    console.log('Modal show');
  }

  private hideEvent() {
    console.log('Modal hide');
  }

}
