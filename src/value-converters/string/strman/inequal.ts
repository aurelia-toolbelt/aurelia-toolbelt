import { valueConverter } from 'aurelia-framework';

// @ts-ignore
import { inequal } from 'strman';

@valueConverter('inequal')
export class InequalValueConverter {
    public toView(stringA: string, stringB: string): boolean {
        return inequal(stringA, stringB);
    }
}
