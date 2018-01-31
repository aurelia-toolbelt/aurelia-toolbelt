import { singleton } from 'aurelia-framework';
const CleanCSS = require('clean-css');

@singleton()
export class CssMinifier {
    public minify(text: string): string {
        let options = { /* options */ };
        let output = new CleanCSS(options).minify(text).styles;
        return output;
    }
}
