import { valueConverter } from 'aurelia-framework';

let wfa = require('./scripts/wordifyfa.js');

@valueConverter('stringifytoman')
export class StringifyTomanValueConverter {
    public toView(number: string): string {
        const len = number.toString().length;
        if (len === 0) {
            return '';
        } else if (len <= 15) {
            return wfa.wordifyRialsInTomans(number);
        } else {
            return 'عدد بسیار بزرگ است و قابل تبدیل نیست';
        }
    }
}
