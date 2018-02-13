import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { format } from 'strman';

@valueConverter('format')
export class FormatValueConverter {
    public toView(value: string, ...params: string[]): string {
        return format(value, params);
    }
}
