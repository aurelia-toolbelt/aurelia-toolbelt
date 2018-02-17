import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { hexEncode } from 'strman';

@valueConverter('hexencode')
export class HexEncodeValueConverter {
    public toView(value: string): string {
        return hexEncode(value);
    }
}

