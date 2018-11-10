import {
  inject,
  bindable,
  bindingMode,
  containerless,
  customAttribute
} from 'aurelia-framework';

export type MaxLengthPlacement =
  | 'bottom'
  | 'left'
  | 'top'
  | 'right'
  | 'bottom-right'
  | 'top-right'
  | 'top-left'
  | 'bottom-left'
  | 'centered-right';

interface PlacementOptions {
  /**
   * The top position of the counter (Number of pixels, or a px or percent string)
   */
  top?: Number | string;
  /**
   * The right position of the counter (Number of pixels, or a px or percent string)
   */
  right?: Number | string;
  /**
   * The bottom position of the counter (Number of pixels, or a px or percent string)
   */
  bottom?: Number | string;
  /**
   * The left position of the counter (Number of pixels, or a px or percent string)
   */
  left?: Number | string;
  /**
   * The positioning to use. For example 'relative', 'absolute'
   */
  position?: string;
}

/**
 * Representation of the current input position
 */
interface PositionParam {
  top: Number;
  right: Number;
  bottom: Number;
  left: Number;
  width: Number;
  height: Number;
}

import 'aureliatoolbelt-thirdparty/bootstrap-maxlength.js/bootstrap-maxlength.js';

@containerless()
@customAttribute('at-max-length')
@inject(Element)
export class AureliaToolbeltMaxLength {
  @bindable({ defaultBindingMode: bindingMode.oneTime })
  public threshold: number = 10;
  @bindable({ defaultBindingMode: bindingMode.oneTime })
  public alwaysShow: boolean = false;
  @bindable({ defaultBindingMode: bindingMode.oneTime })
  public warningClass: string = 'badge badge-success';
  @bindable({ defaultBindingMode: bindingMode.oneTime })
  public limitReachedClass: string = 'badge badge-danger';
  @bindable({ defaultBindingMode: bindingMode.oneTime })
  public separator: string = '/';
  @bindable({ defaultBindingMode: bindingMode.oneTime })
  public preText: string;
  @bindable({ defaultBindingMode: bindingMode.oneTime })
  public postText: string;
  @bindable({ defaultBindingMode: bindingMode.oneTime })
  public showMaxLength: boolean = true;
  @bindable({ defaultBindingMode: bindingMode.oneTime })
  public showCharsTyped: boolean = true;
  @bindable({ defaultBindingMode: bindingMode.oneTime })
  public placement:
    | string
    | MaxLengthPlacement
    | PlacementOptions
    | ((
        currentInput: JQuery,
        maxLengthIndicator: JQuery,
        currentInputPosition: PositionParam
      ) => void) = 'bottom';
  @bindable({ defaultBindingMode: bindingMode.oneTime })
  public appendToParent: boolean = false;
  @bindable({ defaultBindingMode: bindingMode.oneTime })
  public message: string | ((currentText: string, maxLength: Number) => string);
  @bindable({ defaultBindingMode: bindingMode.oneTime })
  public utf8: boolean = false;
  @bindable({ defaultBindingMode: bindingMode.oneTime })
  public showOnReady: boolean = false;
  @bindable({ defaultBindingMode: bindingMode.oneTime })
  public twoCharLinebreak: boolean = true;
  @bindable({ defaultBindingMode: bindingMode.oneTime })
  public customMaxAttribute: string;
  @bindable({ defaultBindingMode: bindingMode.oneTime })
  public allowOverMax: boolean = false;
  @bindable({ defaultBindingMode: bindingMode.oneTime })
  public validate: boolean = false;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public shown: Function;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public hidden: Function;

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
      throw Error('at-max-length works on `input` elements.');
    }
    if (this.element.maxLength === -1) {
      throw Error('You should set `maxLength` property to your input element.');
    }

    if (this.shown) {
      $(this.element).on('maxlength.shown', () => {
        if (this.shown) {
          this.shown();
        }
      });
    }

    if (this.hidden) {
      $(this.element).on('maxlength.hidden', () => {
        if (this.shown) {
          this.hidden();
        }
      });
    }
    $(this.element).maxlength({
      threshold: this.threshold,
      alwaysShow: true,
      warningClass: this.warningClass,
      limitReachedClass: this.limitReachedClass,
      separator: this.separator,
      preText: this.preText,
      postText: this.postText,
      showMaxLength: this.showMaxLength,
      showCharsTyped: this.showCharsTyped,
      placement: this.placement,
      appendToParent: this.appendToParent,
      message: this.message,
      utf8: this.utf8,
      showOnReady: this.showOnReady,
      twoCharLinebreak: this.twoCharLinebreak,
      customMaxAttribute: this.customMaxAttribute,
      allowOverMax: this.allowOverMax,
      validate: this.validate
    });
  }
}
