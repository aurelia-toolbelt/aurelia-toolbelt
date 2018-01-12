import { IZenscrollServiceOptions } from './zenscroll-service-options';
import { transient, customElement, inject, bindable, bindingMode, observable, DOM, singleton, noView } from 'aurelia-framework';

import * as zenscroll from 'zenscroll';

@singleton()
@inject('zenscroll-service-options')
export class ZenscrollService {
    constructor(private options?: IZenscrollServiceOptions) {
    }
}
