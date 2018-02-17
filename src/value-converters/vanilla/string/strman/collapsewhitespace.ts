import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { collapseWhitespace } from 'strman';

@valueConverter('collapsewhitespace')
export class CollapseWhitespaceValueConverter {
    public toView(value: string): string {
        return collapseWhitespace(value);
    }
}
