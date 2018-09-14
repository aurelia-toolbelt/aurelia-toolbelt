```ts
import { inject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { IDeveloper } from './modal';

@inject(DialogController)
export class ModalCreateEditUser {

  private developer: IDeveloper;

  constructor(private dc: DialogController) { }

  public activate(developer: IDeveloper) {
    this.developer = developer || { firstName: '', lastName: '' };
  }

  private okHandler() {
    this.dc.close(true , this.developer);
  }

  private cancelHandler() {
    this.dc.close(false , null);
  }

}
```
