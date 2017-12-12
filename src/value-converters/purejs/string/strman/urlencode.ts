import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { urlEncode } from 'strman';

@valueConverter('urlencode')
export class UrlEncodeValueConverter {
    public toView(value: string): string {
        return urlEncode(value);
    }
}

