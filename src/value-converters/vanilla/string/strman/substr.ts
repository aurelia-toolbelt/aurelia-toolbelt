import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { substr } from 'strman';

@valueConverter('substr')
export class SubstrValueConverter {
    public toView(value: string, start: number, length: number): string {
        return substr(value, start, length);
    }
}
