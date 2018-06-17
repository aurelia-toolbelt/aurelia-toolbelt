import { Router } from 'aurelia-router';
import { inject } from 'aurelia-framework';
// declare var $: any;

@inject(Router)
export class NavBar {
    public router: Router;

    constructor(router: Router) {
        this.router = router;
    }

    public attached() {
      // todo
    }

}
