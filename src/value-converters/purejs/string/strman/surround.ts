import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { surround } from 'strman';

@valueConverter('surround')
export class SurroundValueConverter {
    public toView(value: string, substr: string, substrRight?: string): string {
        return surround(value, substr, substrRight);
    }
}
