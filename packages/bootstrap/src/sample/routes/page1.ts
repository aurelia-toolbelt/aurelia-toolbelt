import { Router } from 'aurelia-router';
import { autoinject } from 'aurelia-framework';


@autoinject
export class Page1 {
    public title: string;

    constructor(public router: Router) {
        // todo
    }

    public canActivate(_a: any, b: any, _c: any) {
        this.title = b.title;
    }

}
