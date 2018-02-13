import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { isString } from 'strman';

@valueConverter('isstring')
export class IsStringValueConverter {
    public toView(value: string): boolean {
        return isString(value);
    }
}
