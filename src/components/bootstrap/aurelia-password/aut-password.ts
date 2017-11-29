import { PasswordMeter } from 'password-meter';
import {
  customAttribute, autoinject, bindable,
  customElement, inject, bindingMode,
  Disposable, BindingEngine
} from 'aurelia-framework';

interface IStrengthRange {
  domain: string;
  message: string;
  color: string;
  cssClass: string;
}


@inject(Element)
@customElement('aut-password')
export class PasswordCustomElement {
  private showStrength: boolean = false;

  @bindable() private strengthRange: Array<IStrengthRange>;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public text: string;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public score: number;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public showPassword: boolean = true;
  private passwordTitle: string;
  private groupClass: string;
  private passwordStyle: string;
  private textStyle: string;

  private element: HTMLInputElement;
  constructor(element: Element) {
    this.element = <HTMLInputElement>element;
  }
  private between(x: number, min: number, max: number) {
    return x >= min && x < max;
  }

  private scorePassword(pass: any) {
    // return new PasswordMeter().getScore(pass).score;
    let score = 0;
    if (!pass) {
      return score;
    }
    // award every unique letter until 5 repetitions
    let letters = new Object();
    for (let i = 0; i < pass.length; i++) {
      letters[pass[i]] = (letters[pass[i]] || 0) + 1;
      score += 5.0 / letters[pass[i]];
    }
    // bonus points for mixing it up
    let variations = {
      digits: /\d/.test(pass),
      lower: /[a-z]/.test(pass),
      upper: /[A-Z]/.test(pass),
      nonWords: /\W/.test(pass)
    };
    let variationCount = 0;
    // tslint:disable-next-line:forin
    for (let check in variations) {
      variationCount += (variations[check] === true) ? 1 : 0;
    }
    score += (variationCount - 1) * 10;
    // tslint:disable-next-line:radix
    return parseInt(score.toString());
  }

  private checkPassStrength(pass: any): IStrengthRange {
    let score = this.scorePassword(pass);
    this.score = score;
    for (let i = 0; i < this.strengthRange.length; i++) {
      if (i >= this.strengthRange.length - 1) {
        return this.strengthRange[i];
      }
      // tslint:disable-next-line:radix
      let status = this.between(score, parseInt(this.strengthRange[i].domain), parseInt(this.strengthRange[i + 1].domain));
      if (status) {
        return this.strengthRange[i];
      }
    }
    return null;
  }

  /**
   *
   */

  private showPasswordChanged(value: boolean) {
    if (value) {
      this.groupClass = 'input-group';
    } else {
      this.groupClass = '';
    }
  }

  private textChanged(value: string) {

    if (value.length > 0) {
      this.groupClass = 'input-group';
      let obj = this.checkPassStrength(value);
      this.passwordTitle = obj.message;
      this.passwordStyle = 'color:white;background-color:' + obj.color + ';border-bottom:3px solid ' + obj.color + ';border-right:2px solid ' + obj.color + ';';

      this.textStyle = 'border-bottom:3px solid ' + obj.color;

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

  private attached() {
    this.strengthRange.sort((a: IStrengthRange, b: IStrengthRange) => {
      // tslint:disable-next-line:radix
      return (parseInt(a.domain) - parseInt(b.domain));
    });

  }

}
