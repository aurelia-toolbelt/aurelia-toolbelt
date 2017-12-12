import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { countSubstr } from 'strman';

@valueConverter('countsubstr')
export class CountSubstrValueConverter {
    public toView(value: string, substr: string, caseSensitive?: boolean, allowOverlapping?: boolean): number {
        return countSubstr(value, substr, caseSensitive, allowOverlapping);
    }
}
