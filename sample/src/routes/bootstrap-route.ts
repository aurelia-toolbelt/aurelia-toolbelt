import { Router, RouterConfiguration } from 'aurelia-router';
import { PLATFORM } from 'aurelia-framework';



export class BootstrapRoute {


  public router: Router;

  public configureRouter(config: RouterConfiguration, router: Router) {

    config.map([
      {
        route: ['', 'toggle'],
        name: 'bootstrap-toggle',


        moduleId: PLATFORM.moduleName('./bootstrap/bootstrap-toggle') ,

        // viewPorts: {
        //   // default: { moduleId: PLATFORM.moduleName('./../components/nav-bar') },
        //   content: { moduleId: PLATFORM.moduleName('./bootstrap/bootstrap-toggle') }
        // },

        nav: true,
        title: 'Toggle',
        settings: { auth: false, isComponent: true }
      },
      {
        route: ['card'],
        name: 'bootstra-card',

        moduleId: PLATFORM.moduleName('./bootstrap/bootstrap-card') ,
        // viewPorts: {
        //   default: { moduleId: PLATFORM.moduleName('./../components/nav-bar') },
        //   content: { moduleId: PLATFORM.moduleName('./bootstrap/bootstrap-card') }
        // },

        nav: true,
        title: 'Card',
        settings: { auth: false, isComponent: true }
      }
    ]);
    this.router = router;
  }

}
