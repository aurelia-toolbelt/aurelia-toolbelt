import { customAttribute, inject, bindable } from 'aurelia-framework';
import { Uuid } from '../../../utilities/vanilla/uuid';

@inject(Element, Uuid)
@customAttribute('aut-id-group')
export class UuidCustomAttribute {

  private id: string;
  constructor(private element: Element, private idgeneratorV4: Uuid) {
  }
  private bind() {

    // @ts-ignore
    if (this.value) {
      // @ts-ignore
      this.element.setAttribute(this.value, 'data-aut-id-group');
    } else {
      this.element.setAttribute(this.idgeneratorV4.Uuidv4ForId(), 'data-aut-id-group');
    }

  }

}
