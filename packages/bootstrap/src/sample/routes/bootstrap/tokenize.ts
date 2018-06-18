
export class BootstrapTokenize {

  private tokens: Array<any>;
  private countries: any[];
  private addInput: HTMLInputElement;

  constructor() {
    this.tokens = [];
    this.countries = [
      { text: 'Argentina', value: 'AR' },
      { text: 'Brazil', value: 'BR' },
      { text: 'Canada', value: 'CA' },
      { text: 'France', value: 'FR' },
      { text: 'Germany', value: 'DE' },
      { text: 'Iran', value: 'IR' },
      { text: 'Netherlands', value: 'NL' },
      { text: 'New Zealand', value: 'NZ' },
      { text: 'Portugal', value: 'PT' },
      { text: 'Spain', value: 'ES' },
      { text: 'Sweden', value: 'SE' },
      { text: 'Switzerland', value: 'CH' },
      { text: 'United Kingdom', value: 'GB' },
      { text: 'United States', value: 'US' }
    ];
  }

  private fill(term: string) {
    let result: any[] = [];
    for (let index = 0; index < this.countries.length; index++) {
      let text = (<string>this.countries[index].text).toLocaleLowerCase();
      if (text.indexOf(term.toLocaleLowerCase()) > -1) {
        result.push(this.countries[index]);
      }
    }
    return result;
  }

  private onAdd(value: string) {
    if (!value) { return; }
    this.tokens.push({ value: value, text: value });
    this.addInput.value = '';

  }
  private onRemove(value: string) {
    if (!value) {
      this.tokens.splice(this.tokens.length - 1, 1);
    } else {
      for (let index = 0; index < this.tokens.length; index++) {
        let text = (<string>this.tokens[index].text).toLocaleLowerCase();
        if (text.indexOf(value.toLocaleLowerCase()) > -1) {
          this.tokens.splice(index, 1);
        }
      }
    }
  }
  private onRemoveAll() {
    this.tokens.splice(0);
  }
}
