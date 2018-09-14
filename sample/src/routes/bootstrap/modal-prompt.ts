import { IDeveloper } from './modal';
import { DialogController } from 'aurelia-dialog';
import { inject } from 'aurelia-framework';


@inject(DialogController)
export class ModalPrompt {

  private dev: IDeveloper;

  constructor(private dc: DialogController) {
  }

  public activate(developer: IDeveloper) {
    this.dev = developer;
  }

  public confirm() {
    this.dc.ok(  );
  }

  public cancel() {
    this.dc.cancel(  );
  }

}
