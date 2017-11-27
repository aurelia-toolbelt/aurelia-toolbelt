import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { binEncode } from 'strman';

@valueConverter('binencode')
export class BinEncodeValueConverter {
    public toView(value: string): string {
        return binEncode(value);
    }
}
