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
    minLength: { value: 5, message: 'Hey!, check minLength' }
  };
  public scoreRange = {
    '40': 'veryWeak',
    '80': 'weak',
    '120': 'medium',
    '180': 'strong',
    '200': 'veryStrong',
    '_': 'perfect'
  };

  constructor(public router: Router) {
  }

  public canActivate(a, b, c) {
    this.title = b.title;
  }

}
