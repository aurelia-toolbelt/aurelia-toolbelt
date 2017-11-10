import { valueConverter } from 'aurelia-framework';

let persianJs = require('./scripts/persian.js');

@valueConverter('persianchars')
export class PersianCharsValueConverter {
    public toView(text: string): string {
        const len = text.toString().length;
        if (len === 0) {
            return '';
        } else {
            return persianJs(text).arabicChar().englishNumber().arabicNumber().toString();
        }
    }
}
