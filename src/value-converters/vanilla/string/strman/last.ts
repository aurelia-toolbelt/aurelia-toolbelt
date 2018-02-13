import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { last } from 'strman';

@valueConverter('last')
export class LastValueConverter {
    public toView(value: string, n: number): string {
        return last(value, n);
    }
}
