import { customElement, bindingMode, bindable, inject } from 'aurelia-framework';

// @ts-ignore
// import * as QRCode from 'qrcodejs';

@inject(Element)
@customElement('aut-qrcode')
export class AureliaToolbeltQrCode {

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public value: string;

  @bindable({ defaultBindingMode: bindingMode.oneTime }) public width: number = 128;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public height: number = 128;

  @bindable({ defaultBindingMode: bindingMode.oneTime }) public darkColor: string = '#000000';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public lightColor: string = '#ffffff';

  // private targetQR: HTMLDivElement;
  private qrGenerator: any | null = null;

  constructor(private element: Element) { }

  private attached() {
    this.width = Number(this.width);
    this.height = Number(this.height);
  }

  private valueChanged(newValue: string) {
    if (newValue) {
      if (this.qrGenerator === null) {
        // ts-ignore
        this.qrGenerator = new QRCode(this.element, {
          text: newValue,
          width: this.width,
          height: this.height,
          colorDark: this.darkColor,
          colorLight: this.lightColor,
          correctLevel: QRCode.CorrectLevel.H
        });
      } else {
        this.qrGenerator.clear();
        this.qrGenerator.makeCode(newValue, {
          text: newValue,
          width: this.width,
          height: this.height,
          colorDark: this.darkColor,
          colorLight: this.lightColor,
          correctLevel: QRCode.CorrectLevel.H
        });
      }
    } else {
      this.qrGenerator.clear();
    }
  }

}
