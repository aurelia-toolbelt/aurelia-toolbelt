import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { contains } from 'strman';

@valueConverter('contains')
export class ContainsValueConverter {
    public toView(value: string, needle: string, caseSensitive?: boolean): boolean {
        return contains(value, needle, caseSensitive);
    }
}
