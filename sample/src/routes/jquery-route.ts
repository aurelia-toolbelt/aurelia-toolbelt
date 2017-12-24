import { PLATFORM } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';


export class JqueryRoute {

    public router: Router;

    public configureRouter(config: RouterConfiguration, router: Router) {

        config.map([
          {
            route: ['blockui'],
            name: 'jq-blockui',

            moduleId: PLATFORM.moduleName('./jquery/blockui'),

        
            nav: true,
            title: 'Block UI',
            settings: { auth: false, isComponent: true }
        }
        ]);
        this.router = router;
    }
}
