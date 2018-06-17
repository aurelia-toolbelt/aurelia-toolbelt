import { deepGet, deepSet } from './deep';

export class FuseHighlightValueConverter {


    public toView(value: Array<any>, cssClass: string) {

        cssClass = cssClass || '';

        let counter = value.length;

        while (counter--) {

            value[counter].item.highlighted = {};
            let matchesCounter = value[counter].matches.length;

            while (matchesCounter--) {
                let result = [];

                let fieldName: string = value[counter].matches[matchesCounter].key;

                let text = deepGet(value[counter].item, fieldName.split('.'), {});


                let matches = value[counter].matches[matchesCounter].indices; // assume these are the matched indices

                let pair = matches.shift();

                // Build the formatted string
                for (let i = 0; i < text.length; i++) {
                    let char = text.charAt(i);
                    if (pair && i === pair[0]) {
                        result.push(`<span class='${cssClass}'>`);
                    }
                    result.push(char);
                    if (pair && i === pair[1]) {
                        result.push('</span>');
                        pair = matches.shift();
                    }
                }

                let highlightedValue = result.join('');

                deepSet(value[counter].item.highlighted, fieldName, highlightedValue);
            }
        }
        return value;
    }
}
