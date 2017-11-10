import { valueConverter } from 'aurelia-framework';

let persianJs = require('./scripts/persian.js');

@valueConverter('persiankeyboard')
export class PersianKeyboardValueConverter {
    public toView(text: string): string {
        const len = text.toString().length;
        if (len === 0) {
            return '';
        } else {
            return persianJs(text).switchKey().toString();
        }
    }
}
