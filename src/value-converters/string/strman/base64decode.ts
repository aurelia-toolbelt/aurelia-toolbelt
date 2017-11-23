import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { base64decode } from 'strman';

@valueConverter('base64decode')
export class Base64DecodeValueConverter {
    public toView(value: string): string {
        return base64decode(value);
    }
}
