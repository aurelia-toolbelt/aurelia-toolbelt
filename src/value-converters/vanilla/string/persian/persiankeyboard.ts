import { valueConverter } from 'aurelia-framework';

const persianjs = require('persianjs');

@valueConverter('persiankeyboard')
export class PersianKeyboardValueConverter {
    public toView(text: string): string {
        const len = text.toString().length;
        if (len === 0) {
            return '';
        } else {
            return persianjs(text).switchKey().toString();
        }
    }
}
