import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';


@autoinject
export class BootstrapDropdownRoute {


  private selectedItemString = 'CPU';
  private stringObjects = ['Motherboard', 'CPU', 'RAM'];


  constructor(private http: HttpClient) {
  }


  private buttonClicked(event: Event, target: HTMLButtonElement) {
    console.log('buttonClicked');
    console.log(target);
    return this.http.get('https://github.com');
  }

}
