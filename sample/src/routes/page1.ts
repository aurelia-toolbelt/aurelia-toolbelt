import { Router } from 'aurelia-router';
import { autoinject } from 'aurelia-framework';


@autoinject
export class Page1 {

    public title: string;

    public rate = 3;

    public myDisable = true;


    private blockValue= false;

    constructor(public router: Router) {
        // todo
    }
    private toggleBlock() {
        this.blockValue = !this.blockValue;
    }

    private canActivate(a, b, c) {
        this.title = b.title;
    }

}
