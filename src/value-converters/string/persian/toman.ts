import { valueConverter } from 'aurelia-framework';

let r = require('./scripts/rial.js');

@valueConverter('toman')
export class TomanValueConverter {
    public toView(number: string, config: object): string {
        const len = number.toString().length;
        if (len === 0) {
            return '';
        } else {
            let rial;
            if (config === undefined || config == null) {
                rial = new r.Rial({
                    decimal: ',',
                    alphabet: 'fa',
                    currency: 'تومان',
                    cut: 1
                });
            } else {
                rial = new r.Rial(config);
            }
            return rial.get(number.toString());
        }
    }
}
