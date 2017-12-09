import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { prepend } from 'strman';

@valueConverter('prepend')
export class PrependValueConverter {
    public toView(value: string, prepends: string): string {
        return prepend(value, prepends);
    }
}
