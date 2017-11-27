import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { split } from 'strman';

@valueConverter('split')
export class SplitValueConverter {
    public toView(value: string, separator: string, limit?: number): string[] {
        return split(value, separator, limit);
    }
}
