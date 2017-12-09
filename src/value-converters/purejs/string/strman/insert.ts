import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { insert } from 'strman';

@valueConverter('insert')
export class InsertValueConverter {
    public toView(value: string, substr: string, index: number): string {
        return insert(value, substr, index);
    }
}
