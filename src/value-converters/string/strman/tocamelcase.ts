import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { toCamelCase } from 'strman';

@valueConverter('tocamelcase')
export class ToCamelCaseValueConverter {
    public toView(value: string): string {
        return toCamelCase(value);
    }
}
