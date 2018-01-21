import { Router } from 'aurelia-router';
import { inject } from 'aurelia-framework';
// declare var $: any;

import * as $ from 'jquery';

@inject(Router)
export class NavBar {
  public router: Router;

  constructor(router: Router) {
    this.router = router;

  }

  // public attached() {
  //   // todo
  //   $('.aut-metis-menu-item-link').click(() => {
  //     document.documentElement.scroll({
  //       top: 0,
  //       left: 0,
  //       behavior: 'smooth'
  //     });
  //   });

  // }
  private showMenu() {
    alert('hi');
  }

}
