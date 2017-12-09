import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { toStudlyCaps } from 'strman';

@valueConverter('tostudlycaps')
export class ToStudlyCapsValueConverter {
    public toView(value: string): string {
        return toStudlyCaps(value);
    }
}
