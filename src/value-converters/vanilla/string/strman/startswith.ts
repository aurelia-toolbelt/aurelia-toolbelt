import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { startsWith } from 'strman';

@valueConverter('startswith')
export class StartsWithValueConverter {
    public toView(value: string, search: string, position?: number, caseSensitive?: boolean): boolean {
        return startsWith(value, search, position, caseSensitive);
    }
}
