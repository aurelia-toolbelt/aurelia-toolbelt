import { Router, RouterConfiguration, RouteConfig } from 'aurelia-router';
import { PLATFORM } from 'aurelia-framework';



export class BootstrapRoute {


  public router: Router;

  public configureRouter(config: RouterConfiguration, router: Router) {
    let routes: Array<RouteConfig> = [
      {
        route: ['', 'alert'],
        name: 'bootstrap-alert',

        moduleId: PLATFORM.moduleName('./bootstrap/alert'),

        nav: true,
        title: 'Alert',
        settings: { auth: false, isComponent: true }
      },
      {
        route: ['badge'],
        name: 'bootstrap-badge',

        moduleId: PLATFORM.moduleName('./bootstrap/badge'),

        nav: true,
        title: 'Badge',
        settings: { auth: false, isComponent: true }
      },
      {
        route: ['buttons'],
        name: 'bootstrap-buttons',

        moduleId: PLATFORM.moduleName('./bootstrap/buttons'),

        nav: true,
        title: 'Buttons',
        settings: { auth: false, isComponent: true }
      },
      {
        route: ['button-groups'],
        name: 'bootstrap-button-groups',

        moduleId: PLATFORM.moduleName('./bootstrap/button-groups'),

        nav: true,
        title: 'Button Groups',
        settings: { auth: false, isComponent: true }
      },
      {
        route: ['breadcrumb'],
        name: 'bootstrap-breadcrumb',

        moduleId: PLATFORM.moduleName('./bootstrap/breadcrumb'),

        nav: true,
        title: 'Breadcrumb',
        settings: { auth: false, isComponent: true }
      },
      {
        route: ['card'],
        name: 'bootstrap-card',


        moduleId: PLATFORM.moduleName('./bootstrap/card'),

        // viewPorts: {
        //   // default: { moduleId: PLATFORM.moduleName('./../components/nav-bar') },
        //   content: { moduleId: PLATFORM.moduleName('./bootstrap/bootstrap-toggle') }
        // },

        nav: true,
        title: 'Card',
        settings: { auth: false, isComponent: true }
      }
      ,
      {
        route: ['carousel'],
        name: 'bootstrap-carousel',

        moduleId: PLATFORM.moduleName('./bootstrap/carousel'),
        nav: true,
        title: 'Carousel',
        settings: { auth: false, isComponent: true }
      }, {
        route: ['collapse'],
        name: 'bootstrap-collapse',

        moduleId: PLATFORM.moduleName('./bootstrap/collapse'),
        nav: true,
        title: 'Collapse',
        settings: { auth: false, isComponent: true }
      }
      , {
        route: ['dropdown'],
        name: 'bootstrap-dropdown',

        moduleId: PLATFORM.moduleName('./bootstrap/dropdown'),
        nav: true,
        title: 'Dropdowns',
        settings: { auth: false, isComponent: true }
      },
      {
        route: ['float-input'],
        name: 'bootstrap-floatinput',

        moduleId: PLATFORM.moduleName('./bootstrap/float-input'),
        nav: true,
        title: 'Float Input',
        settings: { auth: false, isComponent: true }
      },
      {
        route: ['input-group'],
        name: 'bootstrap-input-group',

        moduleId: PLATFORM.moduleName('./bootstrap/input-group'),
        nav: true,
        title: 'Input Group',
        settings: { auth: false, isComponent: true }

      },
      {
        route: ['jumbotron'],
        name: 'bootstrap-jumbotron',

        moduleId: PLATFORM.moduleName('./bootstrap/jumbotron'),
        nav: true,
        title: 'Jumbotron',
        settings: { auth: false, isComponent: true }
      },
      {
        route: ['list-group'],
        name: 'bootstrap-list-group',

        moduleId: PLATFORM.moduleName('./bootstrap/list-group'),
        nav: true,
        title: 'List Group',
        settings: { auth: false, isComponent: true }
      },
      {
        route: ['modal'],
        name: 'bootstrap-modal',

        moduleId: PLATFORM.moduleName('./bootstrap/modal'),
        nav: true,
        title: 'Modals',
        settings: { auth: false, isComponent: true }

      },
      {
        route: ['navbar'],
        name: 'bootstrap-navbar',

        moduleId: PLATFORM.moduleName('./bootstrap/navbar'),
        nav: true,
        title: 'Navbar',
        settings: { auth: false, isComponent: true }

      },
      {
        route: ['navs'],
        name: 'bootstrap-navs',

        moduleId: PLATFORM.moduleName('./bootstrap/navs'),

        nav: true,
        title: 'Navs',
        settings: { auth: false, isComponent: true }
      },
      {
        route: ['password'],
        name: 'bootstrap-password',

        moduleId: PLATFORM.moduleName('./bootstrap/password'),
        nav: true,
        title: 'Password',
        settings: { auth: false, isComponent: true }
      },
      {
        route: ['progress'],
        name: 'bootstrap-progress',

        moduleId: PLATFORM.moduleName('./bootstrap/progress'),
        nav: true,
        title: 'Progressbar',
        settings: { auth: false, isComponent: true }
      },
      {
        route: ['star-rate'],
        name: 'bootstrap-star-rate',

        moduleId: PLATFORM.moduleName('./bootstrap/rate'),
        nav: true,
        title: 'Star Rate',
        settings: { auth: false, isComponent: true }
      },
      {
        route: ['scrollspy'],
        name: 'bootstrap-scrollspy',

        moduleId: PLATFORM.moduleName('./bootstrap/scrollspy'),
        nav: true,
        title: 'Scrollspy',
        settings: { auth: false, isComponent: true }
      },
      {
        route: ['toggle'],
        name: 'bootstrap-toggle',
        moduleId: PLATFORM.moduleName('./bootstrap/toggle'),
        nav: true,
        title: 'Toggle',
        settings: { auth: false, isComponent: true }
      },
      {
        route: ['tokenize'],
        name: 'bootstrap-tokenize',

        moduleId: PLATFORM.moduleName('./bootstrap/tokenize'),
        nav: true,
        title: 'Tokenize',
        settings: { auth: false, isComponent: true }
      },
      {
        route: ['tooltip'],
        name: 'bootstrap-tooltip',

        moduleId: PLATFORM.moduleName('./bootstrap/tooltip'),
        nav: true,
        title: 'Tooltip',
        settings: { auth: false, isComponent: true }
      },
      {
        route: ['popover'],
        name: 'bootstrap-popover',

        moduleId: PLATFORM.moduleName('./bootstrap/popover'),
        nav: true,
        title: 'Popover',
        settings: { auth: false, isComponent: true }

      }
      ,
      {
        route: ['pagination'],
        name: 'bootstrap-pagination',

        moduleId: PLATFORM.moduleName('./bootstrap/pagination'),
        nav: true,
        title: 'Pagination',
        settings: { auth: false, isComponent: true }

      }
    ];

    let direction = 'asc';
    const directionFactor = direction === 'desc' ? -1 : 1;
    routes.sort((current, next) => {
      const currentValue = current.title;
      const nextValue = next.title;

      if (currentValue > nextValue) {
        return directionFactor;
      } else if (currentValue < nextValue) {
        return -directionFactor;
      }
      return 0;
    });

    config.map(routes);
    this.router = router;
  }

}
