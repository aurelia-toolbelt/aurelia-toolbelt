import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { decEncode } from 'strman';

@valueConverter('decencode')
export class DecEncodeValueConverter {
    public toView(value: string): string {
        return decEncode(value);
    }
}
