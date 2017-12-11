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
    minLength: { value: 5, message: 'Hey!, check minLength' },
    maxLength: { value: 10, message: 'Hey!, check maxLength' },
    uppercaseLettersMinLength: { value: 1, message: 'Hey!, check uppercaseLettersMinLength' },
    lowercaseLettersMinLength: { value: 2, message: 'Hey!, check lowercaseLettersMinLength' },
    numbersMinLength: { value: 1, message: 'Hey!, check numbersMinLength' },
    symbolsMinLength: { value: 1, message: 'Hey!, check symbolsMinLength' },
    mustBe: { value: ['a', '$'], message: 'Hey!, check mustBe' },
    mustNotBe: { value: ['1baA$', '0xaZ$'], message: 'Hey!, check mustNotBe' },
    startsWith: { value: '1', message: 'Hey!, check startsWith' },
    endsWith: { value: '$', message: 'Hey!, check endsWith' }
  };
  public scoreRange = {
    '40': 'red',     // very weak    1>=   , <40
    '80': 'yellow',  // weak         40>=  , <80
    '120': 'purple', // medium       80>=  , <120
    '180': 'blue',   // strong       120>= , <200
    '200': 'green'   // very strong  200>=
  };

  constructor(public router: Router) {
  }

  public canActivate(a, b, c) {
    this.title = b.title;
  }

}
