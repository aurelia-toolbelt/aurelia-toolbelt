import { Router } from 'aurelia-router';
import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';


@autoinject
export class Page1 {

    public title: string;

    public rate = 3;

    public myDisable = true;


    private blockValue1 = false;
    private blockValue2 = false;
    private blockValue3 = false;


    constructor(public router: Router, private http: HttpClient) {
        // todo
    }
    private toggleBlock1() {
        this.blockValue1 = !this.blockValue1;
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

    private buttonClicked(event: Event, target: HTMLButtonElement) {
       return  this.http.get('https://github.com');
    }

}
