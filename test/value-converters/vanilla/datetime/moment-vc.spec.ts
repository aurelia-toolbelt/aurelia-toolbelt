
import { DateValueConverter, AgeValueConverter, TimeConverter, RelativeValueConverter } from '../../../../src/value-converters/vanilla/datetime/moment-vc';

import * as jMoment from 'jalali-moment';


// describe('age value converter', () => {

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

test('twenty four hours in english', () => {
  let time_converter: TimeConverter = new TimeConverter();
  let afternoon = time_converter.toView('2017 Mar 01 18:30', false);
  let morning = time_converter.toView('2017 Mar 01 10:01', false);

  expect(afternoon).toBe('06:30:00 PM');
  expect(morning).toBe('10:01:00 AM');
});

test('twenty four hours in english', () => {
  let time_converter: TimeConverter = new TimeConverter();
  let afternoon = time_converter.toView('2017 Mar 01 18:30', true);
  let morning = time_converter.toView('2017 Mar 01 10:01', true);

  expect(afternoon).toBe('18:30:00');
  expect(morning).toBe('10:01:00');
});

test('twenty four hours in persian', () => {
  let time_converter: TimeConverter = new TimeConverter();
  let afternoon = time_converter.toView('2017 Mar 01 18:30', false, 'fa');
  let morning = time_converter.toView('2017 Mar 01 10:01', false, 'fa');

  expect(afternoon).toBe('06:30:00 ب.ظ');
  expect(morning).toBe('10:01:00 ق.ظ');
});

test('twenty four hours in persian', () => {
  let time_converter: TimeConverter = new TimeConverter();
  let afternoon = time_converter.toView('2017 Mar 01 18:30', true, 'fa');
  let morning = time_converter.toView('2017 Mar 01 10:01', true, 'fa');

  expect(afternoon).toBe('18:30:00');
  expect(morning).toBe('10:01:00');
});

// });
