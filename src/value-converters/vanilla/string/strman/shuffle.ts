import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { shuffle } from 'strman';

@valueConverter('shuffle')
export class ShuffleValueConverter {
    public toView(value: string): string {
        return shuffle(value);
    }
}
