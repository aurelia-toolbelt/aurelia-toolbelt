import { PasswordMeter, IResult } from 'password-meter';
import {
  customAttribute, autoinject, bindable,
  customElement, inject, bindingMode,
  Disposable, BindingEngine
} from 'aurelia-framework';

@customElement('abt-password')
export class PasswordCustomElement {

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public inputClass: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public inputStyle: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public buttonClass: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public buttonStyle: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public errorIcon: string = 'fa fa-times';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public showIcon: string = 'fa fa-eye';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public hideIcon: string = 'fa fa-eye-slash';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public progressBarHeight: string = '5px';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public showTooltip: boolean = false;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public showProgressBar: boolean = true;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public size: string = 'md';

  @bindable({ defaultBindingMode: bindingMode.twoWay }) public text: string;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public scoreRange: object = null;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public requirements: object = null;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public passwordVisibility: boolean = true;

  @bindable({ defaultBindingMode: bindingMode.twoWay }) public passwordChanged: Function;

  private txtPassword: HTMLInputElement;
  private btnPassword: HTMLButtonElement;
  private iconPassword: HTMLElement;

  private isInvisible: boolean = true;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) private progressBarValue = 0;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) private progressBarClass: string;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) private progressBarColor: string;


  private passwordMeter: PasswordMeter;

  private afterAttached() {
    let req = this.requirements;
    let range = this.getScoreRangeInfo(this.scoreRange);
    this.passwordMeter = new PasswordMeter(req, range);
  }

  private passwordVisibilityToggle() {
    if (this.isInvisible) {
      this.isInvisible = false;
      $(this.txtPassword).attr('type', 'text');
      this.iconPassword.classList.remove('fa-eye-slash');
      this.iconPassword.classList.add('fa-eye');
    } else {
      this.isInvisible = true;
      $(this.txtPassword).attr('type', 'password');
      this.iconPassword.classList.remove('fa-eye');
      this.iconPassword.classList.add('fa-eye-slash');
    }
  }

  private generateErrorsAsHtml(errors: any): string {
    let html = '';
    if (errors) {
      for (let index = 0; index < errors.length; index++) {
        const element = errors[index];
        html += `<div><i class="abt-password-error ${this.errorIcon}" aria-hidden="true"></i>${element}</div>`;
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

    let result = this.passwordMeter.getResult(value);
    let colorStatus = this.getColorInfo(this.scoreRange, result.status);

    if (result.score >= 0) {
      this.progressBarValue = result.percent;
    } else {
      this.progressBarValue = 100;
      colorStatus = this.getMinColorInfo(this.scoreRange);
    }

    if (colorStatus) {
      if (colorStatus.isClass) {
        this.progressBarClass = colorStatus.color;
      } else {
        this.progressBarColor = colorStatus.color;
      }
    }

    if (this.passwordChanged) {
      this.passwordChanged({
        result: result
      });
    }
  }
}
