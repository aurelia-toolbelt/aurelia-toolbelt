import { valueConverter } from 'aurelia-framework';

const MarkdownIt = require('markdown-it');
const hljs = require('highlight.js');


@valueConverter('md')
export class MarkDownValueConverter {

    public toView(value: string) {

        let md = new MarkdownIt({
            useBR: true,
            linkify: true,
            highlight: function (str: string, lang: string) {
                if (lang && hljs.getLanguage(lang)) {
                    try {
                        return '<pre class="hljs"><code>' +
                            hljs.highlight(lang, str, true).value +
                            '</code></pre>';
                    } catch (__) {
                        console.warn(__);
                    }
                }

                return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
            }
        });

        let result = md.render(value);

        md = null;

        return result;
    }

}
