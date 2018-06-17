import { Router } from 'aurelia-router';
import { inject } from 'aurelia-framework';
import { Uuid } from '@aurelia-toolbelt/core';


@inject(Router, Uuid)
export class Page1 {
  public title: string;

  constructor(public router: Router, private uid: Uuid) {
    console.log(this.uid.uuidv4());
  }

  public canActivate(_a: any, b: any, _c: any) {
    this.title = b.title;
  }

}
