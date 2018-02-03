export class BootstrapTokenize {

  private countries: any[];
  private token: Element;
  private find(term: string) {
    return [{ text: 'Argentina', value: 'AR' }, { text: 'Iran', value: 'IR' }];
  }
  private clear() {
    console.log('clear');
  }
  private onClick() {
    console.log('clicked');
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
    ]
      ;
  }


}
