import { Router } from 'aurelia-router';
import { autoinject } from 'aurelia-framework';


@autoinject
export class Page3 {
    public title: string;

    public num = 0;
    public strrial = 0;
    public strtoman = 0;
    public rial = 0;
    public toman = 0;

    constructor(public router: Router) {


    }

    public canActivate(a, b, c) {
        this.title = b.title;
    }




}
