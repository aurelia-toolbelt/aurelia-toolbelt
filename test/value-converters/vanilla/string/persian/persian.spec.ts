
import { PersianCharsValueConverter } from '../../../../../src/value-converters/vanilla/string/persian/persianchars';
import { PersianKeyboardValueConverter } from '../../../../../src/value-converters/vanilla/string/persian/persiankeyboard';

test('the persian chars value converter - arabic numbers', () => {
  let sut = new PersianCharsValueConverter();
  const result = sut.toView('٠‎١‎٢‎٣‎٤‎٥‎٦‎٧‎٨‎٩‎');
  expect(result).toBe('۰‎۱‎۲‎۳‎۴‎۵‎۶‎۷‎۸‎۹‎');
});

test('the persian chars value converter - english numbers', () => {
  let sut = new PersianCharsValueConverter();
  const result = sut.toView('0123456789');
  expect(result).toBe('۰۱۲۳۴۵۶۷۸۹');
});

test('the persian chars value converter - arabic letters', () => {
  let sut = new PersianCharsValueConverter();
  const result = sut.toView('ي  و  ه  ن  م  ل  ك  ق  ف  غ  ع  ظ  ط  ض  ص  ش  س  ز  ر  ذ  د  خ  ح  ج  ث  ت  ب  ا');
  expect(result).toBe('ی  و  ه  ن  م  ل  ک  ق  ف  غ  ع  ظ  ط  ض  ص  ش  س  ز  ر  ذ  د  خ  ح  ج  ث  ت  ب  ا');
});

/*test('the persian keyboard value converter - all keboard letters', () => {
    let sut = new PersianCharsValueConverter();
    const result = sut.toView('÷1234567890-=×!@#$%^&*)(_+شسیبلاتنمکگپ:"|ظطزرذدئو./؟><ضصثقفغعهخحجچ');
    expect(result).toBe('÷1234567890-=×!@#$%^&*)(_+asdfghjkl;\'m:"|zxcvbnئ,./?><qwertyuiop[]');
});*/
