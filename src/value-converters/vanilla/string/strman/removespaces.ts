import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { removeSpaces } from 'strman';

@valueConverter('removespaces')
export class RemoveSpacesValueConverter {
    public toView(value: string, replaced?: string): string {
        return removeSpaces(value, replaced);
    }
}
