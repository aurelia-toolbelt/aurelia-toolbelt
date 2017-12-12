import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { equal } from 'strman';

@valueConverter('equal')
export class EqualValueConverter {
    public toView(stringA: string, stringB: string): boolean {
        return equal(stringA, stringB);
    }
}
