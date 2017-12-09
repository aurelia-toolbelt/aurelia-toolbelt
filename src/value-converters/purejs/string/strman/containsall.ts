import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { containsAll } from 'strman';

@valueConverter('containsall')
export class ContainsAllValueConverter {
    public toView(value: string, needles: string[], caseSensitive?: boolean): boolean {
        return containsAll(value, needles, caseSensitive);
    }
}
