import { singleton } from 'aurelia-framework';

@singleton()
export class SharedIndex {
  private index = 0;
  public getAndIncrement() {
    return this.index++;
  }
}
