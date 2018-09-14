import { DialogService, DialogController } from 'aurelia-dialog';
import { inject } from 'aurelia-framework';

export interface IDeveloper {
  firstName: String;
  lastName: String;
}
@inject(DialogService)
export class BootstrapModalDemo {

  private showModal = false;

  private developers: Array<IDeveloper> = [
    { firstName: 'Saeed', lastName: 'Ganji' },
    { firstName: 'Hamed', lastName: 'Fathi' }
  ];

  constructor(private ds: DialogService) { }

  private openModal() {

    this.ds.open({
      viewModel: 'routes/bootstrap/modal-user-create.js',
      view: 'routes/bootstrap/modal-user-create.html',
      model: null
    }).whenClosed(res => {
      if (!res.wasCancelled) {
        console.log(res.output);
        this.developers.push(res.output);
      }
      return res;
    }).then(x => {
      console.log('Inside then: ' + x.wasCancelled);
      // console.log(x.firstName);
    });
  }

  private deleteDeveloper(developer) {
    let index = this.developers.findIndex(d => d.firstName === developer.firstName && d.lastName === developer.lastName);

    if (index >= -1) {

      this.ds.open({
        viewModel: 'routes/bootstrap/modal-prompt.js',
        view: 'routes/bootstrap/modal-prompt.html',
        model: developer
      }).whenClosed(res => {

        if (!res.wasCancelled) {
          this.developers.splice(index, 1);
        }

      });

    }
  }

  private showEvent() {
    console.log('Modal show');
  }

  private hideEvent() {
    console.log('Modal hide');
  }



}
