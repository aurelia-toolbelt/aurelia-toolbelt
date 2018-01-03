// import { singleton } from 'aurelia-framework';

// const uuidv1 = require('uuid/v1');
// const uuidv4 = require('uuid/v4');
// const uuidv5 = require('uuid/v5');



// @singleton()
// // tslint:disable-next-line:class-name
// export class uuid {
//   public uuidv1 = uuidv1();
//   public uuidv4 = uuidv4();
//   public uuidv5 = uuidv5();
// }


import { customAttribute } from 'aurelia-framework';


export class Uuid {

  public uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      // tslint:disable-next-line:no-bitwise
      let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
