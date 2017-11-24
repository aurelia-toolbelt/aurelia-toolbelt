import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { htmlEncode } from 'strman';

@valueConverter('htmlencode')
export class HtmlEncodeValueConverter {
    public toView(value: string): string {
        return htmlEncode(value);
    }
}
