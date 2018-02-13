import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { between } from 'strman';

@valueConverter('between')
export class BetweenValueConverter {
    public toView(value: string, start: string, end: string): string[] {
        return between(value, start, end);
    }
}
