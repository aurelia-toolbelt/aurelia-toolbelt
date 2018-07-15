import { inject } from "aurelia-framework";
import { Uuid } from "@aurelia-toolbelt/core";


@inject(Uuid)
export class App {

  constructor(uid: Uuid) {
    this.message = uid.uuidv4();
  }

  message;
}
