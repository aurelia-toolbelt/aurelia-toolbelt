
import { DateValueConverter, AgeValueConverter, TimeConverter, RelativeValueConverter } from '../../../src/value-converters/datetime/moment-vc';

import * as jMoment from 'jalali-moment';


describe('monet value converter', () => {

  it('date of birth', () => {

    let ageConvert: AgeValueConverter = new AgeValueConverter();

    let result = ageConvert.toView('1985/01/23');

    let expected = (new Date()).getFullYear() - 1985;

    expect(result).toBe(expected);

  });

  it('date of birth in persian', () => {

    let ageConvert: AgeValueConverter = new AgeValueConverter();

    let result = ageConvert.toView('1363/11/03');
    let expected = jMoment().year() - 1363;

    expect(result).toBe(expected);

  });

});


// tslint:disable-next-line:no-empty
xdescribe('time check in different formats', () => { });
