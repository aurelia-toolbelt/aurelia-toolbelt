import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { transliterate } from 'strman';

@valueConverter('transliterate')
export class TransLiterateValueConverter {
    public toView(value: string): string {
        return transliterate(value);
    }
}
