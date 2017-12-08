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
  public conf = [
    { 'domain': '1', 'message': 'very weak', 'color': 'red', 'cssClass': '' },
    { 'domain': '40', 'message': 'weak', 'color': 'orange', 'cssClass': '' },
    { 'domain': '80', 'message': 'standard', 'color': 'blue', 'cssClass': '' },
    { 'domain': '120', 'message': 'strong', 'color': 'green', 'cssClass': '' },
    { 'domain': '180', 'message': 'very strong', 'color': 'green', 'cssClass': '' }
  ];

  constructor(public router: Router) {


  }

  public canActivate(a, b, c) {
    this.title = b.title;
  }






}
