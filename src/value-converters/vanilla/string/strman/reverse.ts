import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { reverse } from 'strman';

@valueConverter('reverse')
export class ReverseValueConverter {
    public toView(value: string): string {
        return reverse(value);
    }
}
