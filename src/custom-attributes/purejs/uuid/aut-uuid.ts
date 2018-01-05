import { customAttribute, inject } from 'aurelia-framework';
import { Uuid } from '../../../utilities/purejs/uuid';


@inject(Element, Uuid)
@customAttribute('aut-uuid')
export class UuidCustomAttribute {
  constructor(element: Element, idgeneratorV4: Uuid) {
    element.id = idgeneratorV4.uuidv4();
  }
}
