
// TypeError: Reflect.defineMetadata is not a function
import 'aurelia-polyfills'; // Must be exist and First import :D

import { PersianCharsValueConverter } from './../../../../src/value-converters/string/persian/persianchars';

test('the persian chars value converter', () => {
    let sut = new PersianCharsValueConverter();
    const result = sut.toView('٣٤٥ 789 علي');
    expect(result).toBe('۳۴۵ ۷۸۹ علی');
});

