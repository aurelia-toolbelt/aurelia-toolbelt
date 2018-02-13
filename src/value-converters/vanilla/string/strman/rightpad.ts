import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { rightPad } from 'strman';

@valueConverter('rightpad')
export class RightPadValueConverter {
    public toView(value: string, length: number, char?: string): string {
        return rightPad(value, length, char);
    }
}
