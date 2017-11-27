import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { toUpperCase } from 'strman';

@valueConverter('touppercase')
export class ToUpperCaseValueConverter {
    public toView(value: string): string {
        return toUpperCase(value);
    }
}
