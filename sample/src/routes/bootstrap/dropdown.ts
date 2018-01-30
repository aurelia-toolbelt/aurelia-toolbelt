import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';


@autoinject()
export class BootstrapDropdownRoute {

  private products = [
    { id: 0, name: 'Motherboard' },
    { id: 1, name: 'CPU' },
    { id: 2, name: 'Memory' }
  ];
  private selectedProduct = null;


  private selected_product_matcher = { id: 1, name: 'CPU' };

  private likesTacos = null;

  private selected_Item_String = 'RAM';
  private stringObjects = ['Motherboard', 'CPU', 'RAM'];


  private frameworks: Array<string>;
  private selectedFramework: string;


  constructor(private http: HttpClient) { }

  private productMatcher = (a, b) => a === b || (a.name === b.name);





  private loadFrameworks(event: Event, target: HTMLButtonElement) {

    return this.http.get('./frameworks.json')
      .then(res => {
        let x = JSON.parse(res.response);
        let i;
        this.frameworks = [];
        for (i = 0; i < x.length; i++) {
          this.frameworks.push(x[i]);
        }
      });
  }

  private dropDownShown() {
    console.log('dropdown shown');
  }

  private selectedChanged(selectedItem) {
    console.log('selected item is:');
    console.warn(selectedItem);
  }

}
