import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { truncate } from 'strman';

@valueConverter('truncate')
export class TruncateValueConverter {
    public toView(value: string, length: number, append?: string): string {
        return truncate(value, length, append);
    }
}
