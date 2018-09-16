import { inject, TemplatingEngine } from 'aurelia-framework';
import * as $ from 'jquery';

@inject(TemplatingEngine)
export class AureliaToolbeltBootstrapModalRenderer {

  private dialogs: Array<any> = [];

  constructor() {
    // console.log('Renderer created');
  }

  public getDialogContainer() {
    return document.createElement('template');
  }

  public showDialog(dialogController: any) {
    console.log(dialogController);
    if (!dialogController.showDialog) {
      return this.createDialogHost(dialogController)
        .then(() => {
          return dialogController.showDialog();
        });
    }

    return dialogController.showDialog();
  }

  public hideDialog(dialogController: any) {
    return dialogController.hideDialog();
  }

  public createDialogHost(dialogController: any) {

    let element = dialogController.controller.view.firstChild.nextSibling;
    let controller = element.au.controller;
    let viewModel = controller.viewModel;

    let options = Object.assign(dialogController.settings, {
      show: false,
      focus: viewModel.focus,
      backdrop: viewModel.backdrop,
      keyboard: viewModel.keyboard
    });

    // var view = this.templatingEngine.enhance({
    //   element: element,
    //   bindingContext: dialogController.controller.viewModel,
    //   container: dialogController.controller.container
    // });

    controller.attached(options);
    let dialog = viewModel.jqModal; // $(element).modal(options);

    dialogController.showDialog = () => {
      return new Promise((resolve) => {

        let underlyingModals = $(document.body).children('.modal');

        viewModel.jqModal.on('hidden.bs.modal', () => {
          dialogController.cancel(null); // .hideDialog();
        });

        viewModel.jqModal.on('shown.bs.modal', () => {
          viewModel.jqModal.off('shown.bs.modal');
          resolve();
        });

        // dialogController.slot.attached();

        if (underlyingModals.length) {
          underlyingModals.last().after(element);
        } else {
          document.body.insertBefore(element, document.body.firstChild);
        }

        this.dialogs.push(dialog);
        dialog.modal('show');
      });
    };

    dialogController.hideDialog = () => {

      // let dialog = this.dialogs.pop(); // Might need to do a seek and splice here.
      dialog.modal('hide');

      dialog.off('hidden.bs.modal');

      // controller.detached();

      dialog.get(0).remove();

      return Promise.resolve();
    };

    return Promise.resolve();

  }

}
