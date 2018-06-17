
import { DateValueConverter, AgeValueConverter, TimeConverter, RelativeValueConverter } from '../../../../src/core/value-converters/datetime/moment-vc';

import * as jMoment from 'jalali-moment';

describe('date of birth value converter', () => {

  test('date of birth', () => {

    let age_convert: AgeValueConverter = new AgeValueConverter();

    let result = age_convert.toView('1985/01/23');

    let dob = new Date(1985, 1, 23);
    let today = new Date();

    let expected = today.getFullYear() - dob.getFullYear();

    if (today.getMonth() <= dob.getMonth() && today.getDay() <= dob.getDay()) {
      expected--;
    }

    expect(result).toBe(expected);

  });

  // test('date of birth in persian', () => {

  //   let age_convert: AgeValueConverter = new AgeValueConverter();

  //   let result = age_convert.toView('1363/11/03');
  //   let expected = jMoment().year() - 1363;

  //   expect(result).toBe(expected);

  // });

  // });

  // });

  // describe('time check in different formats', () => {


  // describe('Aurelia plugin', () => {
  //   it('Says hello Aurelia', () => {
  //     expect(new HelloWorld().msg).toBe('Hello Aurelia!');
  //   });
  // });
});

describe('Time formats', () => {

  it('twelve hours in english', () => {
    let time_converter: TimeConverter = new TimeConverter();

    let afternoon = time_converter.toView('2017 Mar 01 18:30', false);
    let morning = time_converter.toView('2017 Mar 01 10:01', false);

    expect(afternoon).toBe('06:30:00 PM');
    expect(morning).toBe('10:01:00 AM');
  });

  it('twenty-four hours in english', () => {
    let time_converter: TimeConverter = new TimeConverter();
    let afternoon = time_converter.toView('2017 Mar 01 18:30', true);
    let morning = time_converter.toView('2017 Mar 01 10:01', true);

    expect(afternoon).toBe('18:30:00');
    expect(morning).toBe('10:01:00');
  });

  it('twelve hours in persian', () => {
    let time_converter: TimeConverter = new TimeConverter();
    let afternoon = time_converter.toView('2017 Mar 01 18:30', false, 'fa');
    let morning = time_converter.toView('2017 Mar 01 10:01', false, 'fa');

    expect(afternoon).toBe('06:30:00 ب.ظ');
    expect(morning).toBe('10:01:00 ق.ظ');
  });

  it('twenty-four hours in persian', () => {
    let time_converter: TimeConverter = new TimeConverter();
    let afternoon = time_converter.toView('2017 Mar 01 18:30', true, 'fa');
    let morning = time_converter.toView('2017 Mar 01 10:01', true, 'fa');

    expect(afternoon).toBe('18:30:00');
    expect(morning).toBe('10:01:00');
  });

});


describe('date value converter in english locale', () => {

  const LOCALE = 'en';

  it('get year', () => {
    let date_converter = new DateValueConverter();
    let year = date_converter.toView('2018/02/03', 'YYYY', LOCALE);

    expect(year).toBe('2018');
  });

  it('get day of year', () => {
    let date_converter = new DateValueConverter();
    let dayOfYear = date_converter.toView('2018/01/23', 'DD', LOCALE);

    expect(dayOfYear).toBe('23');
  });

});


describe('date value converter in persian locale', () => {

  const LOCALE = 'fa';

  it('get year', () => {
    let date_converter = new DateValueConverter();
    let year = date_converter.toView('1397/02/03', 'YYYY', LOCALE);

    expect(year).toBe('1397');
  });

  it('get day of year', () => {
    let date_converter = new DateValueConverter();
    let dayOfYear = date_converter.toView('1397/07/01', 'DDDD', LOCALE);

    expect(dayOfYear).toBe('187');
  });

});

