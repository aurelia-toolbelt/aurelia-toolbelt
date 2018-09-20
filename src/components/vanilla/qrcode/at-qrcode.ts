
import { customElement, bindingMode, bindable, inject } from 'aurelia-framework';
import { QR8BitByte, QRAlphaNum, QRCode, QRKanji, QRNumber, ErrorCorrectLevel } from 'qrcode-generator-ts';

// import { createStringToBytes } from 'qrcode-generator-ts/dist/js/text/createStringToBytes';

@customElement('at-qrcode')
export class AureliaToolbeltQrCode {

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public value: string;
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public errorCorrectionLevel: ErrorCorrectLevel | number = ErrorCorrectLevel.H;

  @bindable({ defaultBindingMode: bindingMode.oneTime }) public typeNumber: number = 8;

  @bindable({ defaultBindingMode: bindingMode.oneTime }) public size: number = 128;
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public darkColor: string = '#000000';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public lightColor: string = '#ffffff';

  private canvas: HTMLCanvasElement;

  private attached() {

    this.size = Number(this.size);

    this.typeNumber = Number(this.typeNumber);

    if (!(1 <= this.typeNumber && this.typeNumber <= 40)) {
      Error('TypeNumber should be between 1 and 40');
    }

    this.errorCorrectionLevel = Number(this.errorCorrectionLevel);
  }

  private drawBarCodeOnCanvas(qr: QRCode) { // }, cellSize = 2, margin = cellSize * 4) {

    let cellSize = Math.floor(this.size / qr.getModuleCount());
    let margin = cellSize * 4;

    let size = qr.getModuleCount() * cellSize + margin * 2;

    this.canvas.width = size;
    this.canvas.height = size;
    let ctx = this.canvas.getContext('2d');

    // fill background
    ctx.fillStyle = this.lightColor;
    ctx.fillRect(0, 0, size, size);

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
      QRCode.stringToBytes = AureliaToolbeltQrCode.stringToBytes_UTF8; // com.d_project.text.stringToBytes_UTF8;

      let qr = new QRCode();

      qr.setTypeNumber(this.typeNumber);
      qr.setErrorCorrectLevel(this.errorCorrectionLevel);

      // switch (this.mode) {
      //   case QrMode.Kanji:
      //     qr.addData(new QRKanji(newValue)); // Kanji( SJIS ) only
      //     break;
      //   case QrMode.Numeric:
      //     qr.addData(new QRNumber(newValue)); // Number only
      //     break;
      //   case QrMode.AlphaNumeric:
      //     qr.addData(new QRAlphaNum(newValue)); // Alphabet and Number
      //     break;
      //   default:
      qr.addData(new QR8BitByte(newValue)); // most useful for usual purpose.
      //     break;
      // }

      //  generates the data
      qr.make();

      // canvas
      this.drawBarCodeOnCanvas(qr); // , 2);
    }
  }

  private static stringToBytes_UTF8(s: string): number[] {
    // http://stackoverflow.com/questions/18729405/how-to-convert-utf8-string-to-byte-array
    function toUTF8Array(str: string): number[] {
      let utf8: number[] = [];
      for (let i = 0; i < str.length; i++) {
        let charcode = str.charCodeAt(i);
        if (charcode < 0x80) { utf8.push(charcode); } else if (charcode < 0x800) {
          // tslint:disable-next-line:no-bitwise
          utf8.push(0xc0 | (charcode >> 6),
            // tslint:disable-next-line:no-bitwise
            0x80 | (charcode & 0x3f));
        } else if (charcode < 0xd800 || charcode >= 0xe000) {
          // tslint:disable-next-line:no-bitwise
          utf8.push(0xe0 | (charcode >> 12),
            // tslint:disable-next-line:no-bitwise
            0x80 | ((charcode >> 6) & 0x3f),
            // tslint:disable-next-line:no-bitwise
            0x80 | (charcode & 0x3f));
        } else {
          i++;
          // UTF-16 encodes 0x10000-0x10FFFF by
          // subtracting 0x10000 and splitting the
          // 20 bits of 0x0-0xFFFFF into two halves
          // tslint:disable-next-line:no-bitwise
          charcode = 0x10000 + (((charcode & 0x3ff) << 10)
            // tslint:disable-next-line:no-bitwise
            | (str.charCodeAt(i) & 0x3ff));
          // tslint:disable-next-line:no-bitwise
          utf8.push(0xf0 | (charcode >> 18),
            // tslint:disable-next-line:no-bitwise
            0x80 | ((charcode >> 12) & 0x3f),
            // tslint:disable-next-line:no-bitwise
            0x80 | ((charcode >> 6) & 0x3f),
            // tslint:disable-next-line:no-bitwise
            0x80 | (charcode & 0x3f));
        }
      }
      return utf8;
    }
    return toUTF8Array(s);
  }


}
