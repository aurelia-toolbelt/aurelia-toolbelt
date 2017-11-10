import { valueConverter } from 'aurelia-framework';

let wfa = require('./scripts/wordifyfa.js');

@valueConverter('stringifyfa')
export class StringifyFaValueConverter {

  public toView(number: string): string {
    const len = number.toString().length;
    if (len === 0) {
      return '';
    } else if (len <= 15) {
      return wfa.wordifyfa(number, 0);
    } else {
      return 'عدد بسیار بزرگ است و قابل تبدیل نیست';
    }
  }
}
