declare namespace inputmask {
  interface Inputmask {
    (alias: any, options: any): Inputmask;
    unmaskedvalue(): string;
    isComplete(): boolean;
    mask(elems: any): any;
    remove(): any;
  }
}

declare module "inputmask" {
  var inputmask: inputmask.Inputmask;
  export = inputmask;
}

interface Element {
  inputmask: inputmask.Inputmask;
}
