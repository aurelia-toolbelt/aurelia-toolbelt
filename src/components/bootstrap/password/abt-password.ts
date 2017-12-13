import { PasswordMeter, IResult } from 'password-meter';
import {
  customAttribute, autoinject, bindable,
  customElement, inject, bindingMode,
  Disposable, BindingEngine
} from 'aurelia-framework';

@inject(Element, PasswordMeter)
@customElement('abt-password')
export class PasswordCustomElement {
  private showStrength: boolean = false;

  @bindable({ defaultBindingMode: bindingMode.twoWay }) public text: string;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public scoreRange: any;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public requirements: any;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public score: number;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public showPassword: boolean = true;
  // @bindable({ defaultBindingMode: bindingMode.twoWay }) public showLastChar: boolean = true;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public color: string;

  private passwordTitle: string;
  private groupClass: string;
  private passwordStyle: string;
  private textStyle: string;
  private txtPassword: HTMLInputElement;
  private icon: Element;

  private invisible: boolean = true;

  constructor(private element: Element, private passwordMeter: PasswordMeter) {
    this.element = <HTMLInputElement>element;
  }

  private scorePassword(pass: any) {
    return this.passwordMeter.getResult(pass).score;
  }

  private showPasswordChanged(value: boolean) {
    if (value) {
      this.groupClass = 'input-group';
    } else {
      this.groupClass = '';
    }
  }

  private passwordVisibility() {
    if (this.invisible) {
      this.invisible = false;
      $(this.txtPassword).attr('type', 'text');
      this.icon.classList.remove('fa-eye-slash');
      this.icon.classList.add('fa-eye');
    } else {
      this.invisible = true;
      $(this.txtPassword).attr('type', 'password');
      this.icon.classList.remove('fa-eye');
      this.icon.classList.add('fa-eye-slash');
    }
  }

  /*
  $('#password').tooltip({
    'trigger':'focus',
    'title': '<ul><li>Coffee</li><li>Tea</li><li>Milk</li></ul>',
    'html':true
  });
  */

  private findOption(message: string, option: any) {
    for (let index = 0; index < option.length; index++) {
      if (message === option.message) {
        return option[index];
      }

    }
  }

  private textChanged(value: string) {

    let scoreOption: any;
    let scoreSetting: any = {};
    if (this.scoreRange) {
      let scores = Object.keys(this.scoreRange);
      for (let index = 0; index < scores.length; index++) {
        let key = scores[index];
        scoreOption = this.scoreRange[scores[index]];
        scoreSetting[key] = scoreOption.message;
      }
    }

    if (value.length > 0) {
      console.log(value);
      this.groupClass = 'input-group';
      this.passwordMeter.requirements = this.requirements;
      this.passwordMeter.scoreRange = scoreSetting;
      let obj = this.passwordMeter.getResult(value);
      console.log(scoreOption);
      let setting: any = this.findOption(obj.status, scoreOption);
      console.log(setting);
      if (setting.color !== undefined) {
        this.color = setting.color;
      } else {
        this.color = 'red';
      }

      this.passwordTitle = obj.status;
      this.passwordStyle = 'color:white;background-color:' + this.color + ';border-bottom:3px solid '
        + this.color + ';border-right:2px solid ' + this.color + ';';
      this.textStyle = 'border-bottom:3px solid ' + this.color;

    } else {
      this.passwordStyle = '';
      this.textStyle = '';
      if (this.showPassword) {
        this.groupClass = 'input-group';
      } else {
        this.groupClass = '';
      }
    }
    return true;
  }

}
