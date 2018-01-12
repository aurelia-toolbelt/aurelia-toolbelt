import { singleton, DOM } from 'aurelia-framework';

@singleton()
export class CommonCssService {
    constructor() {
        DOM.injectStyles(`
        .aut-center
        {
            margin: auto;
            width: 50%;
        }
        .aut-disable-select
        {
            -webkit-touch-callout: none; /* iOS Safari */
            -webkit-user-select: none; /* Safari */
            -khtml-user-select: none; /* Konqueror HTML */
            -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
             user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */
        }
        `);
    }
}
