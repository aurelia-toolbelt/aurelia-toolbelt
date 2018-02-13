import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { base64encode } from 'strman';

@valueConverter('base64encode')
export class Base64EncodeValueConverter {
    public toView(value: string): string {
        return base64encode(value);
    }
}
