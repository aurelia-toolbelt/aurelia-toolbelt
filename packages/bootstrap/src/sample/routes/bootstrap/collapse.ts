

// @ts-ignore
import { ToastrService } from 'aurelia-toolbelt';
import { inject } from 'aurelia-dependency-injection';

@inject(ToastrService)
export class Collapse {

  constructor(private tr: ToastrService) {

  }

  private showCollapse() {
    this.tr.success('Collapse show event called');
  }


  private hideCollapse() {
    this.tr.warning('Collapse hide event called');
  }


}
