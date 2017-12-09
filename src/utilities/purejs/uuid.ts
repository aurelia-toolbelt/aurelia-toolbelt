const uuidv1 = require('uuid/v1');
const uuidv4 = require('uuid/v4');
const uuidv5 = require('uuid/v5');

// tslint:disable-next-line:class-name
export class uuid {
  public uuidv1 = uuidv1();
  public uuidv4 = uuidv4();
  public uuidv5 = uuidv5();
}
