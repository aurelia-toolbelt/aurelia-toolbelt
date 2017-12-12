import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { urlDecode } from 'strman';

@valueConverter('urldecode')
export class UrlDecodeValueConverter {
    public toView(value: string): string {
        return urlDecode(value);
    }
}
