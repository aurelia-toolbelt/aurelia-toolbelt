import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { append } from 'strman';

@valueConverter('append')
export class AppendValueConverter {
    public toView(...text: string[]): string {
        return append(...text);
    }
}
