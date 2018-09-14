import { inject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { IDeveloper } from './modal';



@inject(DialogController)
export class ModalCreatEditUser {

  private developer: IDeveloper;


  constructor(private dc: DialogController) { }


  public activate(developer: IDeveloper) {
    this.developer = developer || { firstName: '', lastName: '' };
  }

  private okHandler() {
    console.log('OK Handler called');
    this.dc.close(true , this.developer);
  }

  private cancelHandler() {
    console.log('Cancel Handler called');
    this.dc.close(false , null);
  }

}
