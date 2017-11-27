import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { toKebabCase } from 'strman';

@valueConverter('tokebabcase')
export class ToKebabCaseValueConverter {
    public toView(value: string): string {
        return toKebabCase(value);
    }
}
