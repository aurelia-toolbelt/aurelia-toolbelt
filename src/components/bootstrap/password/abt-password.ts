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


  private color: string;
  private passwordTitle: string;
  private groupClass: string;
  private passwordStyle: string;
  private passwordSpan: string;
  private passwordClass: string;
  private textStyle: string;
  private txtPassword: HTMLInputElement;
  private icon: Element;
  private invisible: boolean = true;

  constructor(private element: Element, private passwordMeter: PasswordMeter) {
    this.element = <HTMLInputElement>element;
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

  private findOption(message: string, option: any): any {
    for (let index = 0; index < option.length; index++) {
      if (message === option[index].message) {
        return option[index];
      }

    }
  }

  private textChanged(value: string) {
    let cls = 'input-group-addon visible-md-* visible-lg-* ';
    this.passwordClass = cls;

    let option: any = [];
    let scoreSetting: any = {};
    if (this.scoreRange) {
      let scores = Object.keys(this.scoreRange);
      for (let index = 0; index < scores.length; index++) {
        let key = scores[index];
        let scoreOption = this.scoreRange[scores[index]];
        option.push(scoreOption);
        scoreSetting[key] = scoreOption.message;
      }
    }

    if (value.length > 0) {
      this.groupClass = 'input-group';
      this.passwordMeter.requirements = this.requirements;
      this.passwordMeter.scoreRange = scoreSetting;
      let obj = this.passwordMeter.getResult(value);
      let setting: any = this.findOption(obj.status, option);

      /*if (obj.score < 0) {
        $(this.txtPassword).tooltip({
          'trigger': 'focus',
          'title': '<ul><li>Coffee</li><li>Tea</li><li>Milk</li></ul>',
          'html': true
        });
      }*/


      if (setting && setting.color !== undefined) {
        this.color = setting.color;
      } else {
        this.color = option[0].color;
      }

      this.passwordTitle = obj.status;

      let classNames: any = this.findOption(obj.status, option);
      if (classNames && classNames.class !== undefined) {
        cls = cls + classNames.class;
        this.passwordClass = cls;
        this.passwordStyle = '';
      } else {
        this.passwordStyle = 'color:white;background-color:' + this.color + ';border-bottom:3px solid '
          + this.color + ';border-right:2px solid ' + this.color + ';';
        this.textStyle = 'border-bottom:3px solid ' + this.color;
      }

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
