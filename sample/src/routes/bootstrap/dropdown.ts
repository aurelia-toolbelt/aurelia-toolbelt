import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';


@autoinject
export class BootstrapDropdownRoute {

  private products = [
    { id: 0, name: 'Motherboard' },
    { id: 1, name: 'CPU' },
    { id: 2, name: 'Memory' }
  ];
  private selectedProduct = null;

  // private selectedProductMatcher = { id: 1, name: 'CPU' };





  private likesTacos = null;


  private selectedItemString = 'CPU';
  private stringObjects = ['Motherboard', 'CPU', 'RAM'];


  constructor(private http: HttpClient) {
  }


  private buttonClicked(event: Event, target: HTMLButtonElement) {
    console.log('buttonClicked');
    console.log(target);
    return this.http.get('https://github.com');
  }

  private productMatcher = (a, b) => a.id === b.id;

}
