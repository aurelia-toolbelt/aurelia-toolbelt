import { valueConverter } from 'aurelia-framework';
import * as numeral from 'numeral';
@valueConverter('number')
export class NumberValueConverter {
    public toView(value: string, format: string): string {
        if (!value) {
            return null;
        }
        return numeral(value).format(format);
    }
}
