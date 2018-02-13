import { NumberValueConverter } from '../../../../../src/value-converters/vanilla/string/numeral/number';
test('numeral formatter value converter', () => {
    let vc = new NumberValueConverter();
    const result = vc.toView('1000', '0,0');
    expect(result).toBe('1,000');
});
