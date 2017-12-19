import { Router } from 'aurelia-router';
import { autoinject } from 'aurelia-framework';


@autoinject
export class Page3 {
  public title: string;
  public appended: string[] = ['s', 'tr', 'm', 'an'];
  public num = 0;
  public strrial = 0;
  public strtoman = 0;
  public rial = 0;
  public toman = 0;
  public keyboard = 'لخخلمث';
  public url = 'https://fa.wikipedia.org/wiki/%D8%B5%D9%81%D8%AD%D9%87%D9%94_%D8%A7%D8%B5%D9%84%DB%8C';
  public word = '٣٤٥ 789 علي';
  public requirements = {
    minLength: 5
  };
  public scoreRange = {
    '40': { message: 'veryWeak', color: 'red' },
    '80': { message: 'weak', color: 'khaki' },
    '120': { message: 'medium', color: 'orange' },
    '180': { message: 'strong', color: 'maroon' },
    '200': { message: 'veryStrong', color: 'blue' },
    '_': { message: 'perfect', color: 'green' }
  };

  constructor(public router: Router) {
  }
  /*
    public asyncLoader(element, response) {
      setTimeout(function () {
        element.html('element handled by "asyncLoader"');
        response(true);
      }, 1000);
    }
  */

  public canActivate(a, b, c) {
    this.title = b.title;
  }


  public x( element: any , response: any ) {
    console.warn('***********************************************************');
    console.warn('***********************************************************');
  }

}
