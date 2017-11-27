import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { hexDecode } from 'strman';

@valueConverter('hexdecode')
export class HexDecodeValueConverter {
    public toView(value: string): string {
        return hexDecode(value);
    }
}
