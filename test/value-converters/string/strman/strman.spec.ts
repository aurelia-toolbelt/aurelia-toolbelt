import { BetweenValueConverter } from './../../../../src/value-converters/string/strman/between';
import { Base64EncodeValueConverter } from './../../../../src/value-converters/string/strman/base64encode';
import { Base64DecodeValueConverter } from './../../../../src/value-converters/string/strman/base64decode';
import { AtValueConverter } from './../../../../src/value-converters/string/strman/at';
import { AppendArrayValueConverter } from './../../../../src/value-converters/string/strman/appendArray';
import { AppendValueConverter } from './../../../../src/value-converters/string/strman/append';

test('strman append value converter', () => {
    let vc = new AppendValueConverter();
    const result = vc.toView('s', 'tr', 'm', 'an');
    expect(result).toBe('strman');
});
test('strman appendArray value converter', () => {
    let vc = new AppendArrayValueConverter();
    const result = vc.toView('s', ['tr', 'm', 'an']);
    expect(result).toBe('strman');
});
test('strman at value converter', () => {
    let vc = new AtValueConverter();
    const result = vc.toView('abc', 1);
    expect(result).toBe('b');
});
test('strman base64decode value converter', () => {
    let vc = new Base64DecodeValueConverter();
    const result = vc.toView('c3RybWFu');
    expect(result).toBe('strman');
});
test('strman base64encode value converter', () => {
    let vc = new Base64EncodeValueConverter();
    const result = vc.toView('strman');
    expect(result).toBe('c3RybWFu');
});
test('strman between value converter', () => {
    let vc = new BetweenValueConverter();
    const result = vc.toView('[abc][def]', '[', ']');
    expect(result).toEqual(['abc', 'def']);
});
