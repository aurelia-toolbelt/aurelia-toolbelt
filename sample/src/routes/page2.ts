import { Router } from 'aurelia-router';
import { autoinject } from 'aurelia-framework';


@autoinject
export class Page2 {
    public title: string;


    private filter:string;
    private names:Array<string>;

    constructor(public router: Router) {
        this.names = ["Vegar" , "Saeed" , "Hamed"]
    }

    public canActivate(a, b, c) {
        this.title = b.title;
    }

}
