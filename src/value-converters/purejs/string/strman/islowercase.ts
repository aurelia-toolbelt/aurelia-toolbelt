import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { isLowerCase } from 'strman';

@valueConverter('islowercase')
export class IsLowerCaseValueConverter {
    public toView(value: string): boolean {
        return isLowerCase(value);
    }
}
