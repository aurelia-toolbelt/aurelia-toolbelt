import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { leftTrim } from 'strman';

@valueConverter('lefttrim')
export class LeftTrimValueConverter {
    public toView(value: string, char?: string): string {
        return leftTrim(value, char);
    }
}
