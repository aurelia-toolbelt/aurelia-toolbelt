import { PLATFORM } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';


export class JqueryRoute {

    public router: Router;

    public configureRouter(config: RouterConfiguration, router: Router) {

        config.map([
            {
                route: ['', 'blockui'],
                name: 'jq-blockui',

                moduleId: PLATFORM.moduleName('./jquery/blockui'),


                nav: true,
                title: 'Block UI',
                settings: { auth: false, isComponent: true }
            }
            /*,{
                route: ['lazyimage'],
                name: 'jq-lazyimage',

                moduleId: PLATFORM.moduleName('./jquery/lazy-image'),


                nav: true,
                title: 'Lazy Image',
                settings: { auth: false, isComponent: true }
            }*/
            // ,
            // {
            //     route: ['newsticker'],
            //     name: 'jq-newsticker',

            //     moduleId: PLATFORM.moduleName('./jquery/news-ticker'),
            //     nav: true,
            //     title: 'News Ticker',
            //     settings: { auth: false, isComponent: true }
            // }
        ]);
        this.router = router;
    }
}
