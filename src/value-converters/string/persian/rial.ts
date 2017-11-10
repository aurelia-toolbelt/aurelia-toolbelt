import { valueConverter } from 'aurelia-framework';

let r = require('./scripts/rial.js');

@valueConverter('rial')
export class RialValueConverter {
    /*public toView(number: string): string {
        console.log(r);
        console.log(r.Rial());
        const rial = new r.Rial({
            decimal: ',',
            alphabet: 'fa',
            currency: 'هزار ریال',
            cut: 3
        });
        return rial.get(number);
    }*/
}
