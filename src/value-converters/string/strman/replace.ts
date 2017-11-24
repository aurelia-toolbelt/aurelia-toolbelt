import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { replace } from 'strman';

@valueConverter('replace')
export class ReplaceValueConverter {
    public toView(value: string, search: string, newvalue: string, caseSensitive?: boolean, multiline?: boolean): string {
        return replace(value, search, newvalue, caseSensitive, multiline);
    }
}
