import { bindingMode } from 'aurelia-binding';
import { bindable } from 'aurelia-templating';
import { autoinject } from 'aurelia-dependency-injection';
// @ts-ignore
import { ToastrService } from 'aurelia-toolbelt';
@autoinject()
export class ScrollUp {

    private thresholdValue = '1000';

    constructor(private ts: ToastrService) {
    }

    private onBeforeScrollUp() {
        this.ts.info('You will go to the top of the page soon!', 'Before', {
            progressBar: false, preventDuplicates: false
        });
    }

    private onAfterScrollup() {
        this.ts.success('Congrats, you are at the beginning of the page!', 'After', {
            progressBar: false, preventDuplicates: false
        });
    }
}
