import { HttpClient } from 'aurelia-http-client';

import { inject } from 'aurelia-framework';

// @ts-ignore
import { ToastrService } from 'aurelia-toolbelt';



@inject(HttpClient, ToastrService)
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


  constructor(private http: HttpClient, private ts: ToastrService) { }

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
    this.ts.success('The dropdown shown event got fired');
  }

  private selectedChanged(selectedItem) {
    this.ts.info(`Your favorite js framework is: ${selectedItem}`);
  }

}
