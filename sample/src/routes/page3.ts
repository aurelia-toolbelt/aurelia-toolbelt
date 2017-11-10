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
    public keyboard = 'لخخلمث';
    public url = 'https://fa.wikipedia.org/wiki/%D8%B5%D9%81%D8%AD%D9%87%D9%94_%D8%A7%D8%B5%D9%84%DB%8C';
    public word = '٣٤٥ 789 علي';

    constructor(public router: Router) {


    }

    public canActivate(a, b, c) {
        this.title = b.title;
    }




}
