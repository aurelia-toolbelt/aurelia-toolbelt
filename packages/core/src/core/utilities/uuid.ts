import { customAttribute, singleton } from 'aurelia-framework';

@singleton()
export class Uuid {

  public uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      // tslint:disable-next-line:no-bitwise
      let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  public Uuidv4ForId() {
    return 'aut_uuid_' + this.uuidv4().replace(new RegExp('-', 'g'), '');
  }

}
