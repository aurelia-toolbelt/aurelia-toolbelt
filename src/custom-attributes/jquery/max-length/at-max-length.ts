import {
  inject,
  bindable,
  bindingMode,
  containerless,
  customAttribute
} from 'aurelia-framework';

import 'aureliatoolbelt-thirdparty/bootstrap-maxlength.js/bootstrap-maxlength.js';

@containerless()
@customAttribute('at-max-length')
@inject(Element)
export class AureliaToolbeltMaxLength {

  @bindable({ defaultBindingMode: bindingMode.oneTime })
  public threshold: number = 10;

  constructor(private element: HTMLInputElement) {}
  private isTextBox(element: Element) {
    let tagName = element.tagName.toLowerCase();
    if (tagName === 'textarea') {
      return true;
    }
    if (tagName !== 'input') {
      return false;
    }
    let type = element.getAttribute('type').toLowerCase(),
      // if any of these input types is not supported by a browser, it will behave as input type text.
      inputTypes = [
        'text',
        'password',
        'number',
        'email',
        'tel',
        'url',
        'search',
        'date',
        'datetime',
        'datetime-local',
        'time',
        'month',
        'week'
      ];
    return inputTypes.indexOf(type) >= 0;
  }
  private attached() {
    if (!this.isTextBox(this.element)) {
      Error('at-float-label works on `input` elements.');
    }


    this.element.maxLength = this.threshold;

    $(this.element).maxlength({
      threshold: this.threshold
    });
  }
}
