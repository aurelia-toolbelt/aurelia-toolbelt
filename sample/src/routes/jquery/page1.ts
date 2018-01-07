
import { Router } from 'aurelia-router';
import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';


@autoinject
export class Page1 {

  public title: string;

  public rate = 3;

  public myDisable = true;


  private blockValue1 = true;
  private blockValue2 = true;
  private blockValue3 = true;


  constructor(public router: Router, private http: HttpClient) {
    // todo
  }
  private toggleBlock1() {
    this.blockValue1 = !this.blockValue1;
    /*if (this.blockValue1) {
      this.toastrService.info('Blocked');
    } else {
      this.toastrService.info('Unblocked');
    }*/
    console.log(this.blockValue1);
  }
  private toggleBlock2() {
    this.blockValue2 = !this.blockValue2;
  }
  private toggleBlock3() {
    this.blockValue3 = !this.blockValue3;
  }
  private canActivate(a, b, c) {
    this.title = b.title;
  }


}
