
function deepGetByArray(obj: any, propsArray: any, defaultValue: any): any {

    if (obj === undefined || obj === null) {
        return defaultValue;
    }
    if (propsArray.length === 0) {
        return obj;
    }


    let foundSoFar = obj[propsArray[0]];
    let remainingProps = propsArray.slice(1);

    return deepGetByArray(foundSoFar, remainingProps, defaultValue);
}

export function deepGet(obj: any, props: any, defaultValue: any): any {

    if (typeof props === 'string') {
        props = props.split('.');
    }
    return deepGetByArray(obj, props, defaultValue);
}

export function deepSet(obj: any, path: string, value: any) {

    let keys = Array.isArray(path) ? path : path.split('.');
    let i = 0;
    for (; i < keys.length - 1; i++) {
        let key = keys[i];
        obj[key] = {};
        obj = obj[key];
    }
    obj[keys[i]] = value;
    return value;
}
