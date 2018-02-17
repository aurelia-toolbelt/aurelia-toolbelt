

export class FilterByValueConverter {

    public toView(array: Array<any>, value: string, ...properties: any[]) {

        value = (value || '').trim().toLowerCase();

        if (!value) {
            return array;
        }

        if (properties.length) {

            return array.filter(item =>
                properties.some(property => (item[property] || '').toLowerCase().includes(value)));
        }

        return array.filter(item => item.toLowerCase().includes(value));
    }
}
