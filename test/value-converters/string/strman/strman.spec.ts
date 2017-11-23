import { CompareValueConverter } from './../../../../src/value-converters/string/strman/compare';
import { CollapseWhitespaceValueConverter } from './../../../../src/value-converters/string/strman/collapsewhitespace';
import { CharsValueConverter } from './../../../../src/value-converters/string/strman/chars';
import { BinDecodeValueConverter } from './../../../../src/value-converters/string/strman/bindecode';
import { BinEncodeValueConverter } from './../../../../src/value-converters/string/strman/binencode';
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
test('strman bindecode value converter', () => {
    let vc = new BinDecodeValueConverter();
    const result = vc.toView('000000000111001100000000011101000000000001110010000000000110110100000000011000010000000001101110');
    expect(result).toBe('strman');
});
test('strman binencode value converter', () => {
    let vc = new BinEncodeValueConverter();
    const result = vc.toView('strman');
    expect(result).toBe('000000000111001100000000011101000000000001110010000000000110110100000000011000010000000001101110');
});
test('strman chars value converter', () => {
    let vc = new CharsValueConverter();
    const result = vc.toView('abc');
    expect(result).toEqual(['a', 'b', 'c']);
});
test('strman collapsewhitespace value converter', () => {
    let vc = new CollapseWhitespaceValueConverter();
    const result = vc.toView('  a  b  c  ');
    expect(result).toBe('a b c');
});

describe('strman compare value converter', () => {
    let vc;
    beforeAll(() => {
        vc = new CompareValueConverter();
    });
    it('if stringA > stringB return 1', () => {
        const result = vc.toView('abcd', 'abc');
        expect(result).toEqual(1);
    });
    it('if stringA < stringB return -1', () => {
        const result = vc.toView('abc', 'abcd');
        expect(result).toEqual(-1);
    });
    it('if stringA = stringB return 0', () => {
        const result = vc.toView('abc', 'abc');
        expect(result).toEqual(0);
    });
});
