import { PLATFORM } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';


export class Purejs {

  public router: Router;

  public configureRouter(config: RouterConfiguration, router: Router) {

    config.map([
      {
        route: ['', 'checkbox'],
        name: 'pure-checkbox',
        moduleId: PLATFORM.moduleName('./vanilla/checkbox'),
        nav: true,
        title: 'Pretty Checkbox',
        settings: { auth: false, isComponent: true }
      },
      {
        route: ['', 'loading-indicator'],
        name: 'loading-indicator',
        moduleId: PLATFORM.moduleName('./vanilla/loading-indicator'),
        nav: true,
        title: 'Loading Indicator',
        settings: { auth: false, isComponent: true }
      },
      {
        route: ['radio'],
        name: 'pure-radio',
        moduleId: PLATFORM.moduleName('./vanilla/radio'),
        nav: true,
        title: 'Pretty Radio',
        settings: { auth: false, isComponent: true }
      },
      {
        route: ['markdown'],
        name: 'pure-markdown',

        moduleId: PLATFORM.moduleName('./vanilla/mark-down'),

        nav: true,
        title: 'Mark Down',
        settings: { auth: false, isComponent: true }
      },
      {
        route: ['masked-input'],
        name: 'pure-masked-input',

        moduleId: PLATFORM.moduleName('./vanilla/masked-input'),

        nav: true,
        title: 'Masked Input',
        settings: { auth: false, isComponent: true }
      },
      {
        route: ['scrollup'],
        name: 'pure-scrollup',
        moduleId: PLATFORM.moduleName('./vanilla/scrollup'),
        nav: true,
        title: 'ScrollUp',
        settings: { auth: false, isComponent: true }
      },
      {
        route: ['divider'],
        name: 'pure-divider',
        moduleId: PLATFORM.moduleName('./vanilla/divider'),
        nav: true,
        title: 'Divider',
        settings: { auth: false, isComponent: true }
      },
      {
        route: ['qrcode'],
        name: 'pure-qrcode',
        moduleId: PLATFORM.moduleName('./vanilla/qrcode'),
        nav: true,
        title: 'QR Code',
        settings: { auth: false, isComponent: true }
      }
      /*,{
          route: ['microlink'],
          name: 'pure-microlink',
          moduleId: PLATFORM.moduleName('./vanilla/microlink'),
          nav: true,
          title: 'Microlink',
          settings: { auth: false, isComponent: true }
      }*/
    ]);
    this.router = router;
  }
}
