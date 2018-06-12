/* tslint:disable */

const fastSafeStringify = require('fast-safe-stringify');

interface JSON {
    safeStringify(value: any): string;
}

JSON.safeStringify = obj => fastSafeStringify(obj);

