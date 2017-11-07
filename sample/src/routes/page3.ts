import { Router } from 'aurelia-router';
import { autoinject } from 'aurelia-framework';


@autoinject
export class Page3 {
    public title: string;

    constructor(public router: Router) {
        // todo
    }

    public canActivate(a, b, c) {
        this.title = b.title;
    }

}
