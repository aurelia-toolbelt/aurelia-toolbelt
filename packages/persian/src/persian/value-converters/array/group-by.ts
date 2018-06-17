

export class GroupByValueConverter {

    public toView(array: Array<any>, property: string): Array<any> {

        const groups = new Map();

        for (let item of array) {   // foreach loop

            let key = item[property]; // using property as a key for the map e.g. firstName
            let group = groups.get(key);

            if (!group) {
                group = { key, items: [] };
                groups.set(key, group);
            }

            group.items.push(item);

        }

        return Array.from(groups.values());
    }

}
