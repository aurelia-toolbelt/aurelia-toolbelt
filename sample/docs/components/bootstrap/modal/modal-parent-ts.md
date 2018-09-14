```ts
import { DialogService } from 'aurelia-dialog';
import { inject } from 'aurelia-framework';

export interface IDeveloper {
  firstName: String;
  lastName: String;
}

@inject(DialogService)
export class BootstrapModalDemo {

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
        this.developers.push(res.output);
      }

    });
  }

```
