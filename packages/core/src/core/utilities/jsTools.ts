import { singleton } from 'aurelia-framework';

// https://www.webbjocke.com/javascript-check-data-types/
@singleton()
export class JsTools {

  // Returns if a value is a string
  public isString(value: any) {
    return typeof value === 'string' || value instanceof String;
  }

  // Returns if a value is really a number
  public isNumber(value: any) {
    return typeof value === 'number' && isFinite(value);
  }

  // Returns if a value is an array
  // ES5 actually has a method for this (ie9+)
  // Array.isArray(value);
  public isArray(value: any) {
    return value && typeof value === 'object' && value.constructor === Array;
  }

  // Returns if a value is a function
  public isFunction(value: any) {
    return typeof value === 'function';
  }

  // Returns if a value is an object
  public isObject(value: any) {
    return value && typeof value === 'object' && value.constructor === Object;
  }

  // Returns if a value is an object and empty
  public isEmpty(value: any) {
    for (let key in value) {
      if (value.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  // Returns if a value is null
  public isNull(value: any) {
    return value === null;
  }

  // Returns if a value is undefined
  public isUndefined(value: any) {
    return typeof value === 'undefined';
  }

  // Returns if a value is a boolean
  public isBoolean(value: any) {
    return typeof value === 'boolean';
  }

  // Returns if a value is a regexp
  public isRegExp(value: any) {
    return value && typeof value === 'object' && value.constructor === RegExp;
  }

  // Returns if value is an error object
  public isError(value: any) {
    return value instanceof Error && typeof value.message !== 'undefined';
  }

  // Returns if value is a date object
  public isDate(value: any) {
    return value instanceof Date;
  }

  // Returns if a Symbol
  public isSymbol(value: any) {
    return typeof value === 'symbol';
  }

  public jsonFormatter(value: any) {
    return JSON.stringify(value, null, '\t');
  }

  public isUrl(value: any) {
    if (!this.isString(value)) {
      return false;
    }
    let pattern = new RegExp('^((https?:)?\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locater
    if (!pattern.test(value)) {
      return false;
    } else {
      return true;
    }
  }
}
