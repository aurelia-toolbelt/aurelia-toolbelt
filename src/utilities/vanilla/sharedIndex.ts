import { singleton, transient } from 'aurelia-framework';

@singleton()
export class SharedIndex {
  private dictionary: string[] = [];

  public getAndIncrement(id: string) {
    id = this.getId(id);
    if (this.dictionary[id] === undefined) {
      this.dictionary[id] = 0;
    } else {
      this.dictionary[id] += 1;
    }
    return this.dictionary[id];
  }
  public getValue(id: string) {
    id = this.getId(id);
    return this.dictionary[id];
  }
  public reset(id: string) {
    id = this.getId(id);
    this.dictionary[id] = 0;
  }
  public resetAll() {
    this.dictionary = [];
  }

  private getId(id: string) {
    return 'a' + id.replace(new RegExp('-', 'g'), '');
  }


}
