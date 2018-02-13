import { BootstrapModalIntegration } from '../../BootstrapModal';




import { DialogController } from 'aurelia-dialog';
import { inject } from 'aurelia-framework';

import * as $ from 'jquery';


@inject(DialogController)
export class TestDialog {


  private modal: HTMLDivElement;
  private model: any;

  constructor(private dialogController: DialogController) { }

  private activate(model: any) {
    this.model = model;
    $(`#tstShahab`).modal('show');
  }

  private ok() {
    this.dialogController.ok('Grate job buddy');
  }

  private cancel() {
    this.dialogController.cancel('Cancelled');
  }

}
