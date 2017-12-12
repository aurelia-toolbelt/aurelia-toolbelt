import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { toLowerCase } from 'strman';

@valueConverter('tolowercase')
export class ToLowerCaseValueConverter {
    public toView(value: string): string {
        return toLowerCase(value);
    }
}
