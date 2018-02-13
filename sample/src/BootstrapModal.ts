
import { DialogController } from 'aurelia-dialog';
import { inject } from 'aurelia-framework';

import * as $ from 'jquery';


@inject(DialogController)
export class BootstrapModalIntegration {


  private modal: HTMLDivElement;
  protected model: any;

  constructor(protected dialogController: DialogController) { }

  protected activate(model: any) {
    this.model = model;
    $(this.modal).modal('show');
  }

}
