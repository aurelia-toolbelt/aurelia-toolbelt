import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { removeLeft } from 'strman';

@valueConverter('removeleft')
export class RemoveLeftValueConverter {
    public toView(value: string, prefix: string, caseSensitive?: boolean): string {
        return removeLeft(value, prefix, caseSensitive);
    }
}
