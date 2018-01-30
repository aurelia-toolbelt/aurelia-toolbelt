```ts
import { HttpClient } from 'aurelia-http-client';
import { inject } from 'aurelia-framework';
import { ToastrService } from 'aurelia-toolbelt';

@inject(HttpClient, ToastrService)
export class BootstrapDropdownRoute {

  private frameworks: Array<string>;
  private selectedFramework: string;

  constructor(private http: HttpClient, private ts: ToastrService) { }

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

  private selectedChanged(selectedItem) {
    this.ts.info(`Your favorite js framework is: ${selectedItem}`);
  }

}
```