
import { valueConverter } from 'aurelia-binding';

const humanizeDuration = require('humanize-duration');

@valueConverter('humanize')
export class HumanizeValueConverter {
  public toView(value: number, options: any): string {

    return humanizeDuration(value, options);

  }
}
