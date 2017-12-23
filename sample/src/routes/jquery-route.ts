import { PLATFORM } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';


export class JqueryRoute {

    public router: Router;

    public configureRouter(config: RouterConfiguration, router: Router) {

        config.map([
            {
                route: ['', 'toggle'],
                name: 'bootstra-toggle',

                viewPorts: {
                    default: { moduleId: PLATFORM.moduleName('./../components/nav-bar') },
                    content: { moduleId: PLATFORM.moduleName('./bootstrap/bootstrap-toggle') }
                },

                nav: true,
                title: 'Toggle',
                settings: { auth: false }
            },
            {
                route: ['card'],
                name: 'bootstra-card',

                viewPorts: {
                    default: { moduleId: PLATFORM.moduleName('./../components/nav-bar') },
                    content: { moduleId: PLATFORM.moduleName('./bootstrap/bootstrap-card') }
                },

                nav: true,
                title: 'Toggle',
                settings: { auth: false }
            }
        ]);
        this.router = router;
    }
}
