import { containerless } from 'aurelia-framework';



@containerless()
export class InternalBadge {

    private data: any;

    private activate(model: any) {
        this.data = model;
    }
}
