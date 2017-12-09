import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { rightTrim } from 'strman';

@valueConverter('righttrim')
export class RightTrimValueConverter {
    public toView(value: string, char?: string): string {
        return rightTrim(value, char);
    }
}
