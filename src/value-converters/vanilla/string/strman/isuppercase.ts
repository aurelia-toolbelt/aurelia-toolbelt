import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { isUpperCase } from 'strman';

@valueConverter('isuppercase')
export class IsUpperCaseValueConverter {
    public toView(value: string): boolean {
        return isUpperCase(value);
    }
}
