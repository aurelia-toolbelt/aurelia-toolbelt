import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { decDecode } from 'strman';

@valueConverter('decdecode')
export class DecDecodeValueConverter {
    public toView(value: string): string {
        return decDecode(value);
    }
}
