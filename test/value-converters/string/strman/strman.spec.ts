import { InequalValueConverter } from './../../../../src/value-converters/string/strman/inequal';
import { HtmlEncodeValueConverter } from './../../../../src/value-converters/string/strman/htmlencode';
import { HtmlDecodeValueConverter } from './../../../../src/value-converters/string/strman/htmldecode';
import { HexEncodeValueConverter } from './../../../../src/value-converters/string/strman/hexencode';
import { HexDecodeValueConverter } from './../../../../src/value-converters/string/strman/hexdecode';
import { FormatValueConverter } from './../../../../src/value-converters/string/strman/format';
import { FirstValueConverter } from './../../../../src/value-converters/string/strman/first';
import { EqualValueConverter } from './../../../../src/value-converters/string/strman/equal';
import { EnsureRightValueConverter } from './../../../../src/value-converters/string/strman/ensureright';
import { EnsureLeftValueConverter } from './../../../../src/value-converters/string/strman/ensureleft';
import { EndsWithValueConverter } from './../../../../src/value-converters/string/strman/endswith';
import { DecEncodeValueConverter } from './../../../../src/value-converters/string/strman/decencode';
import { DecDecodeValueConverter } from './../../../../src/value-converters/string/strman/decdecode';
import { CountSubstrValueConverter } from './../../../../src/value-converters/string/strman/countsubstr';
import { ContainsAnyValueConverter } from './../../../../src/value-converters/string/strman/containsany';
import { ContainsAllValueConverter } from './../../../../src/value-converters/string/strman/containsall';
import { ContainsValueConverter } from './../../../../src/value-converters/string/strman/contains';
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
test('strman contains value converter', () => {
    let vc = new ContainsValueConverter();
    const title = 'Daniel Leite';
    const needle = 'leite';
    const result = vc.toView(title, needle, false);
    expect(result).toBeTruthy();
});
test('strman containsall value converter', () => {
    let vc = new ContainsAllValueConverter();
    const title = 'Daniel Leite';
    const needles = ['Leite', 'Daniel'];
    const result = vc.toView(title, needles, false);
    expect(result).toBeTruthy();
});
test('strman containsany value converter', () => {
    let vc = new ContainsAnyValueConverter();
    const title = 'Daniel Leite';
    const needles = ['Leite', 'Oliveira'];
    const result = vc.toView(title, needles, false);
    expect(result).toBeTruthy();
});
test('strman countsubstr value converter', () => {
    let vc = new CountSubstrValueConverter();
    const title = 'Daniel Leite';
    const substr = 'Leite';
    const result = vc.toView(title, substr);
    expect(result).toEqual(1);
});
test('strman decdecode value converter', () => {
    let vc = new DecDecodeValueConverter();
    const result = vc.toView('001150011600114001090009700110');
    expect(result).toBe('strman');
});
test('strman decencode value converter', () => {
    let vc = new DecEncodeValueConverter();
    const result = vc.toView('strman');
    expect(result).toBe('001150011600114001090009700110');
});
test('strman endswith value converter', () => {
    let vc = new EndsWithValueConverter();
    const value = 'Daniel Leite';
    const search = 'Leite';
    const result = vc.toView(value, search);
    expect(result).toBeTruthy();
});
test('strman ensureleft value converter', () => {
    let vc = new EnsureLeftValueConverter();
    const value = 'Leite';
    const substr = 'Daniel ';
    const result = vc.toView(value, substr);
    expect(result).toBe('Daniel Leite');
});
test('strman ensureright value converter', () => {
    let vc = new EnsureRightValueConverter();
    const value = 'Daniel';
    const substr = ' Leite';
    const result = vc.toView(value, substr);
    expect(result).toBe('Daniel Leite');
});
test('strman equal value converter', () => {
    let vc = new EqualValueConverter();
    const result = vc.toView('foo', 'foo');
    expect(result).toBeTruthy();
});
test('strman first value converter', () => {
    let vc = new FirstValueConverter();
    const result = vc.toView('strman', 3);
    expect(result).toBe('str');
});
test('strman format value converter', () => {
    let vc = new FormatValueConverter();
    const select = `SELECT * FROM CONTACTS WHERE NAME LIKE '%{0}%' AND EMAIL LIKE '%{1}%'`;
    const result = vc.toView(select, 'DANIEL', 'GMAIL');
    expect(result).toBe(`SELECT * FROM CONTACTS WHERE NAME LIKE '%DANIEL%' AND EMAIL LIKE '%GMAIL%'`);
});
test('strman hexdecode value converter', () => {
    let vc = new HexDecodeValueConverter();
    const result = vc.toView('007300740072006d0061006e');
    expect(result).toBe('strman');
});
test('strman hexencode value converter', () => {
    let vc = new HexEncodeValueConverter();
    const result = vc.toView('strman');
    expect(result).toBe('007300740072006d0061006e');
});
test('strman htmldecode value converter', () => {
    let vc = new HtmlDecodeValueConverter();
    const result = vc.toView('&lt;div&gt;').toLowerCase();
    expect(result).toBe('<div>');
});
test('strman htmlencode value converter', () => {
    let vc = new HtmlEncodeValueConverter();
    const result = vc.toView('<div>').toLowerCase();
    expect(result).toBe('&lt;div&gt;');
});
test('strman inequal value converter', () => {
    let vc = new InequalValueConverter();
    const result = vc.toView('foo', 'foo');
    expect(result).toBeFalsy();
});
