import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';
// @ts-ignore
import { ToastrService } from 'aurelia-toolbelt';

@autoinject
export class Buttons {

  constructor(private http: HttpClient, private ts: ToastrService) {
    // todo
  }

  private onClick(event: Event, target: HTMLButtonElement) {
    this.ts.success('Button clicked', 'Hooray', {
      progressBar: false, preventDuplicates: false
    });
    return this.http.get('https://github.com/aurelia-toolbelt');
  }

  private onClickWithoutPromise(event: Event, target: HTMLButtonElement) {
    this.ts.warning('Button clicked', 'Hooray', {
      progressBar: false, preventDuplicates: false
    });
    this.http.get('https://github.com/aurelia-toolbelt');
  }

}
