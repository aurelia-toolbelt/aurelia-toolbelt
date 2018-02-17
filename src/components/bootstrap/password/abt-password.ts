import { JsTools } from './../../../utilities/vanilla/jsTools';
import { PasswordMeter, IResult } from 'password-meter';
import {
  customAttribute, autoinject, bindable,
  customElement, inject, bindingMode,
  Disposable, BindingEngine
} from 'aurelia-framework';

export type ButtonColorType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
export type ErrorDisplayType = 'none' | 'tooltip' | 'list';

@inject(JsTools)
@customElement('abt-password')
export class PasswordCustomElement {

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public inputClass: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public inputStyle: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public buttonClass: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public buttonStyle: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public buttonColorType: ButtonColorType = 'secondary';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public errorIcon: string = 'fa fa-times';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public showPasswordIcon: string = 'fa fa-eye';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public hidePasswordIcon: string = 'fa fa-eye-slash';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public progressBarHeight: string = '5px';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public errorDisplayType: ErrorDisplayType = 'none';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public showProgressBar: boolean | string = true;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public size: string = 'md';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public showPercent: boolean | string = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public passwordVisibility: boolean | string = true;

  @bindable({ defaultBindingMode: bindingMode.twoWay }) public text: string;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public scoreRange: object = null;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public requirements: object = null;

  @bindable({ defaultBindingMode: bindingMode.twoWay }) public passwordChanged: Function;

  private isInvisible: boolean = true;
  private txtPassword: HTMLInputElement;
  private btnPassword: HTMLButtonElement;
  private iconPassword: HTMLElement;
  private errorsList: HTMLDivElement;
  private passwordTemplate: Element;

  private progressBarValue = 0;
  private percentValue = '';

  private progressBarClass: string = null;
  private progressBarColor: string = null;

  private passwordMeter: PasswordMeter;

  constructor(private jsTools: JsTools) {
  }


  private afterAttached() {

    // tslint:disable-next-line:max-line-length
    this.showProgressBar = (this.showProgressBar === '' && this.passwordTemplate.hasAttribute('show-progress-bar')) || this.showProgressBar.toString() === 'true';
    this.showPercent = (this.showPercent === '' && this.passwordTemplate.hasAttribute('show-percent')) || this.showPercent.toString() === 'true';
    // tslint:disable-next-line:max-line-length
    this.passwordVisibility = (this.passwordVisibility === '' && this.passwordTemplate.hasAttribute('password-visibility')) || this.passwordVisibility.toString() === 'true';
    let req = this.requirements;
    let range = this.getScoreRangeInfo(this.scoreRange);
    this.passwordMeter = new PasswordMeter(req, range);

    if (this.text && this.text.length > 0) {
      this.textChanged(this.text);
    }
  }

  private passwordVisibilityToggle() {
    if (this.isInvisible) {
      this.isInvisible = false;
      $(this.txtPassword).attr('type', 'text');
    } else {
      this.isInvisible = true;
      $(this.txtPassword).attr('type', 'password');
    }
  }

  private generateErrorsAsHtml(errors: any): string {
    let html = '';
    if (errors) {
      for (let index = 0; index < errors.length; index++) {
        const element = errors[index];
        html += `<div class="abt-password-error-item"><i class="abt-password-error-icon ${this.errorIcon}" aria-hidden="true"></i>${element}</div>`;
      }
    }
    return html;
  }

  private getScoreRangeInfo(scoreRange: any): any {
    let option: any = {};
    let color = '';
    let isClass: boolean = false;
    let scores = Object.keys(scoreRange);
    for (let index = 0; index < scores.length; index++) {
      let key = scores[index];
      let message = scoreRange[key].message;
      option[key] = message;
    }
    return option;
  }

  private getMinColorInfo(scoreRange: any): any {
    let scores = Object.keys(scoreRange);
    let color = null;
    let isClass = false;
    let key = scores[0];
    let message = scoreRange[key].message;
    color = scoreRange[key].color;
    isClass = color.startsWith('.');
    return {
      color: color,
      isClass: isClass
    };
  }

  private getColorInfo(scoreRange: any, status: string): any {
    let scores = Object.keys(scoreRange);
    let color = null;
    let isClass = false;
    for (let index = 0; index < scores.length; index++) {
      let key = scores[index];
      let message = scoreRange[key].message;
      if (message === status) {
        color = scoreRange[key].color;
        isClass = color.startsWith('.');
        break;
      }
    }
    if (!color) {
      return null;
    }
    return {
      color: color,
      isClass: isClass
    };
  }

  private textChanged(value: string) {

    if (!this.scoreRange) {
      throw Error("The 'score-range' property can not be null.");
    }

    if (!this.jsTools.isObject(this.scoreRange)) {
      throw Error("The 'score-range' property must be an object.");
    }

    let result = this.passwordMeter.getResult(value);
    let colorStatus = this.getColorInfo(this.scoreRange, result.status);

    if (colorStatus) {
      if (colorStatus.isClass) {
        this.progressBarClass = colorStatus.color.replace('.', '');
        this.progressBarColor = null;
      } else {
        this.progressBarClass = null;
        this.progressBarColor = colorStatus.color;
      }
    }

    if (result.score >= 0) {
      this.progressBarValue = result.percent;
      if (this.showPercent && result.score > 0) {
        this.percentValue = result.percent + '%';
      }
    } else {
      this.percentValue = '';
      this.progressBarValue = 100;
      colorStatus = this.getMinColorInfo(this.scoreRange);
      if (colorStatus.isClass) {
        this.progressBarClass = colorStatus.color.replace('.', '');
        this.progressBarColor = null;
      } else {
        this.progressBarClass = null;
        this.progressBarColor = colorStatus.color;
      }
    }

    if (result.score < 0) {
      this.percentValue = '';
      if (this.errorDisplayType === 'tooltip') {
        $(this.txtPassword).tooltip({
          'title': this.generateErrorsAsHtml(result.errors),
          'html': true,
          'animation': true,
          'placement': 'bottom',
          // tslint:disable-next-line:max-line-length
          'template': '<div class="tooltip" role="tooltip"><div class="arrow"></div><div style="max-width: 350px;" class="tooltip-inner text-left text-nowrap"></div></div>'
        });
        this.errorsList.innerHTML = '';
      } else if (this.errorDisplayType === 'list') {
        $(this.txtPassword).tooltip('dispose');
        this.errorsList.innerHTML = this.generateErrorsAsHtml(result.errors);
      } else {
        $(this.txtPassword).tooltip('dispose');
        this.errorsList.innerHTML = '';
      }
    }
    if (result.score === 0 || !result.errors) {
      $(this.txtPassword).tooltip('dispose');
      this.errorsList.innerHTML = '';
      if (result.score === 0) {
        this.percentValue = '';
      }
    }

    if (this.passwordChanged) {
      this.passwordChanged({
        result: result,
        colorStatus: colorStatus
      });
    }
  }
}
