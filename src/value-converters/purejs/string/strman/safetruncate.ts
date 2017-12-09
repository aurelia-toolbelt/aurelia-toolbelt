import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { safeTruncate } from 'strman';

@valueConverter('safetruncate')
export class SafeTruncateValueConverter {
    public toView(value: string, length: number, append?: string): string {
        return safeTruncate(value, length, append);
    }
}
