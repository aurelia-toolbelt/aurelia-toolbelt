
import { FuseOptions } from 'fuse.js';
import * as Fuse from 'fuse.js';



export class FuseValueConverter {


    public toView(value: Array<any>, options: FuseOptions, criteria: string) {

        if (options === null || options === undefined) { return value || []; }

        if (!criteria) {
            options.threshold = 1;
            return new Fuse(value, options).search(' ');
        }

        const fuse = new Fuse(value, options);
        let result = fuse.search(criteria);

        return result;
    }
}

