import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { removeEmptyStrings } from 'strman';

@valueConverter('removeemptystrings')
export class RemoveEmptyStringsValueConverter {
    public toView(strings: string[]): string[] {
        return removeEmptyStrings(strings);
    }
}
