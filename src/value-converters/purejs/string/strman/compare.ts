import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { compare } from 'strman';

@valueConverter('compare')
export class CompareValueConverter {
    public toView(valueA: string, valueB: string): number {
        return compare(valueA, valueB);
    }
}
