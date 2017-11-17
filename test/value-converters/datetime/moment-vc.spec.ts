
import { DateValueConverter, AgeValueConverter, TimeConverter, RelativeValueConverter } from '../../../src/value-converters/datetime/moment-vc';

describe('monet value converter', () => {

  it('date of birth', () => {

    let ageConvert: AgeValueConverter = new AgeValueConverter();

    let result = ageConvert.toView('1985/01/23');

    let expected = (new Date()).getFullYear() - 1985;

    expect(result).toBe(expected);

  });

});
