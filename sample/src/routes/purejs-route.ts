import { PLATFORM } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';


export class Purejs {

    public router: Router;

    public configureRouter(config: RouterConfiguration, router: Router) {

        config.map([
            {
                route: ['', 'checkbox'],
                name: 'pure-checkbox',
                moduleId: PLATFORM.moduleName('./purejs/checkbox'),
                nav: true,
                title: 'Pretty Checkbox',
                settings: { auth: false, isComponent: true }
            },
            {
                route: ['radio'],
                name: 'pure-radio',
                moduleId: PLATFORM.moduleName('./purejs/radio'),
                nav: true,
                title: 'Pretty Radio',
                settings: { auth: false, isComponent: true }
            },
            {
                route: ['markdown'],
                name: 'pure-markdown',

                moduleId: PLATFORM.moduleName('./purejs/mark-down'),

                               nav: true,
                title: 'Mark Down',
                settings: { auth: false, isComponent: true }
            },
            {
                route: ['masked-input'],
                name: 'pure-masked-input',

                moduleId: PLATFORM.moduleName('./purejs/masked-input'),

                               nav: true,
                title: 'Masked Input',
                settings: { auth: false, isComponent: true }
            },
            {
                route: ['microlink'],
                name: 'pure-microlink',
                moduleId: PLATFORM.moduleName('./purejs/microlink'),
                nav: true,
                title: 'Microlink',
                settings: { auth: false, isComponent: true }
            }
        ]);
        this.router = router;
    }
}
