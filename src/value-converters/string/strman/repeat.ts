import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { repeat } from 'strman';

@valueConverter('repeat')
export class RepeatValueConverter {
    public toView(value: string, multiplier: number): string {
        return repeat(value, multiplier);
    }
}
