import { autoinject, customAttribute } from 'aurelia-framework';

@autoinject
@customAttribute('after-render')
export class AfterRenderCustomAttribute {
  private value: any;

  constructor(private element: Element) { }

  private attached() {
    this.value({ ele: this.element });
  }
}
