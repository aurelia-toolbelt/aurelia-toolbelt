import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { ensureRight } from 'strman';

@valueConverter('ensurright')
export class EnsureRightValueConverter {
    public toView(value: string, substr: string, caseSensitive?: boolean): string {
        return ensureRight(value, substr, caseSensitive);
    }
}
