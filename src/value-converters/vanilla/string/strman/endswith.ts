import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { endsWith } from 'strman';

@valueConverter('endswith')
export class EndsWithValueConverter {
    public toView(value: string, search: string, position?: number, caseSensitive?: boolean): boolean {
        return endsWith(value, search, position, caseSensitive);
    }
}
