import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { appendArray } from 'strman';

@valueConverter('appendArray')
export class AppendArrayValueConverter {
    public toView(value: string, append: string[]): string {
        return appendArray(value, append);
    }
}
