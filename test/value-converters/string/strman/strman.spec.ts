import { AppendArrayValueConverter } from './../../../../src/value-converters/string/strman/appendArray';
import { AppendValueConverter } from './../../../../src/value-converters/string/strman/append';

test('strman append value converter', () => {
    let vc = new AppendValueConverter();
    const result = vc.toView('s', 'tr', 'm', 'an');
    expect(result).toBe('strman');
});
test('strman append value converter', () => {
    let vc = new AppendArrayValueConverter();
    const result = vc.toView('s', ['tr', 'm', 'an']);
    expect(result).toBe('strman');
});
