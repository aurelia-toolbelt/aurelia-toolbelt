// import { DialogService, DialogController } from 'aurelia-dialog';

import { inject } from 'aurelia-framework';

interface IUser {
  firstName: String;
  lastName: String;
}

// @inject(DialogService)
export class BootstrapModalDemo {


  private showModal = false;

  private user: IUser = { firstName: '', lastName: '' };
  private users: Array<IUser> = [
    { firstName: 'Saeed', lastName: 'Ganji' },
    { firstName: 'Hamed', lastName: 'Fathi' }
  ];

  private dismiss(data: IUser) {
    this.user = data;

    let u = {};
    Object.assign(u, data);
    this.users.push(<IUser>u);
  }

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
