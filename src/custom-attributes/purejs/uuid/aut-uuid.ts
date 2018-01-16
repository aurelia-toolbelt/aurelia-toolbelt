import { customAttribute, inject, bindable } from 'aurelia-framework';
import { Uuid } from '../../../utilities/purejs/uuid';

@inject(Element, Uuid)
@customAttribute('aut-uuid')
export class UuidCustomAttribute {

  private id: string;
  constructor(private element: Element, private idgeneratorV4: Uuid) {
  }
  private bind() {
    this.id = this.idgeneratorV4.uuidv4();
    // @ts-ignore
    if (this.value) {
      // @ts-ignore
      this.element.setAttribute(this.value, this.id);
    } else {
      this.element.id = this.id;

    }
  }

}
