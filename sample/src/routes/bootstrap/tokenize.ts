
export class BootstrapTokenize {

  private myArray: Array<any>;
  private countries: any[];

  constructor() {
    this.myArray = [];
  }

  private find(term: string) {
    return this.countries;
  }
  private clear() {
    console.log('clear');
  }
  private onClick() {
    this.myArray.push({ value: Math.random(), text: 'Test - ' + Math.random() });
  }
  private onRemove() {
    this.myArray.splice(3, 1);
  }

  private search(e: any, v: any) {
    console.log(v);
  }
  private attached() {
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
}
