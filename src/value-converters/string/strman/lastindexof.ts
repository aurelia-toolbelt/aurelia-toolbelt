import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { lastIndexOf } from 'strman';

@valueConverter('lastindexof')
export class LastIndexOfValueConverter {
    public toView(value: string, needle: string, offset?: number, caseSensitive?: boolean): number {
        return lastIndexOf(value, needle, offset, caseSensitive);
    }
}
