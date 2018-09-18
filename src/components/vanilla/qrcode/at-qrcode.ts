import { customElement, bindingMode, bindable, inject } from 'aurelia-framework';
// import 'qrcodejs/qrcode.js';
import { QR8BitByte, QRAlphaNum, QRCode, QRKanji, QRNumber, ErrorCorrectLevel } from 'qrcode-generator-ts';

@inject(Element)
@customElement('at-qrcode')
export class AureliaToolbeltQrCode {

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public value: string;

  @bindable({ defaultBindingMode: bindingMode.oneTime }) public size: number = 128;

  @bindable({ defaultBindingMode: bindingMode.oneTime }) public darkColor: string = '#000000';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public lightColor: string = '#ffffff';

  // private qr_img: HTMLImageElement;

  private canvas: HTMLCanvasElement;

  constructor(private element: Element) {
  }

  private attached() {
    this.size = Number(this.size);
  }

  private createCanvas(qr: QRCode) { // }, cellSize = 2, margin = cellSize * 4) {

    // let canvas = document.createElement('canvas');
    // let mconst = qr.getModuleCount();
    // let size = qr.getModuleCount() * cellSize + margin * 2;

    let cellSize = Math.floor(this.size / qr.getModuleCount());
    let margin = cellSize * 4;

    this.canvas.width = this.size;
    this.canvas.height = this.size;
    let ctx = this.canvas.getContext('2d');

    // fill background
    ctx.fillStyle = this.lightColor;
    ctx.fillRect(0, 0, this.size, this.size);

    // draw cells
    ctx.fillStyle = this.darkColor;
    for (let row = 0; row < qr.getModuleCount(); row += 1) {
      for (let col = 0; col < qr.getModuleCount(); col += 1) {
        if (qr.isDark(row, col)) {
          ctx.fillRect(
            col * cellSize + margin,
            row * cellSize + margin,
            cellSize, cellSize);
        }
      }
    }
    // return canvas;
  }


  private valueChanged(newValue: string) {
    if (newValue) {

      // uncomment if UTF-8 support is required.
      // QRCode.stringToBytes = com.d_project.text.stringToBytes_UTF8;

      let qr = new QRCode();
      qr.setTypeNumber(5);
      qr.setErrorCorrectLevel(ErrorCorrectLevel.L);
      // qr.addData(new QRNumber('0123')); // Number only
      // qr.addData(new QRAlphaNum('AB5678CD')); // Alphabet and Number
      qr.addData(new QR8BitByte(newValue)); // most useful for usual purpose.
      // qr.addData('[here is 8BitByte too]');
      // qr.addData(new QRKanji('漢字')); // Kanji(SJIS) only
      qr.make();

      // canvas
      // this.element.appendChild(this.createCanvas(qr, 2));
      this.createCanvas(qr); // , 2);

      // img
      // let img = document.createElement('img');
      // this.qr_img.width = this.size;
      // this.qr_img.height = this.size;
      // this.qr_img.setAttribute('src', qr.toDataURL());
      // document.body.appendChild(img);

    }
  }
}
