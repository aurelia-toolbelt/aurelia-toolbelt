import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { chars } from 'strman';

@valueConverter('chars')
export class CharsValueConverter {
    public toView(value: string): string[] {
        return chars(value);
    }
}
