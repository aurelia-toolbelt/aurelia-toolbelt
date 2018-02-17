import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { prependArray } from 'strman';

@valueConverter('prependarray')
export class PrependArrayValueConverter {
    public toView(value: string, prepends: string[]): string {
        return prependArray(value, prepends);
    }
}
