import { valueConverter } from 'aurelia-framework';

const moment = require('jalali-moment');


@valueConverter('relative')
export class RelativeValueConverter {
  public toView(value: string) {

    if (!value) {
      return null;
    }
    return moment(value).fromNow();
  }
}

@valueConverter('date')
export class DateValueConverter {
  public toView(value: string, format: string = 'YYYY/MM/DD', locale: string = 'en') {
    if (!value) {
      return null;
    }

    let m2 = moment(value).locale(locale);
    return m2.format(format);
  }
}

@valueConverter('time')
export class TimeConverter {
  public toView(value: string, show24Hours: string | boolean = true, locale: string = 'en') {
    if (!value) { return null; }

    let format = show24Hours === true || show24Hours === 'true' ? 'HH:mm:ss' : 'hh:mm:ss A';

    return moment(value).locale(locale).format(format);
  }
}

@valueConverter('age')
export class AgeValueConverter {
  public toView(dob: string) {
    if (!dob) { return null; }
    return Math.floor(moment().diff(moment(dob), 'year', false));
  }
}
