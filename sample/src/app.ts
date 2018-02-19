import { Router, RouterConfiguration } from 'aurelia-router';
import { PLATFORM, bindable, EventManager, inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { DOM } from 'aurelia-pal';

// @ts-ignore
import { BootstrapTypographyService } from 'aurelia-toolbelt';

class Theme {
  public name: string;
  public path: string;
}

@inject(EventAggregator, BootstrapTypographyService)
export class App {

  public router: Router;
  private rate = 3;

  private themes: Array<Theme>;
  @bindable() private selectedTheme: Theme;

  constructor(eventAggregator: EventAggregator, private bsService: BootstrapTypographyService) {

    this.themes = [
      { name: 'aurelia-toolbelt', path: '/bootswatch/aurelia-toolbelt' },
      { name: 'bootstrap', path: '/bootswatch/bootstrap' },
      { name: 'bootstrap-rtl', path: '/bootswatch/bootstrap-rtl' },
      { name: 'cerulean', path: '/bootswatch/cerulean' },
      { name: 'cosmo', path: '/bootswatch/cosmo' },
      { name: 'cyborg', path: '/bootswatch/cyborg' },
      { name: 'darkly', path: '/bootswatch/darkly' },
      { name: 'litera', path: '/bootswatch/litera' },
      { name: 'lumen', path: '/bootswatch/lumen' },
      { name: 'lux', path: '/bootswatch/lux' },
      { name: 'minty', path: '/bootswatch/minty' },
      { name: 'sandstone', path: '/bootswatch/sandstone' },
      { name: 'simplex', path: '/bootswatch/simplex' },
      { name: 'sketchy', path: '/bootswatch/sketchy' },
      { name: 'slate', path: '/bootswatch/slate' },
      { name: 'spacelab', path: '/bootswatch/spacelab' },
      { name: 'superhero', path: '/bootswatch/superhero' },
      { name: 'united', path: '/bootswatch/united' },
      { name: 'yeti', path: '/bootswatch/yeti' }
    ];
  }



  public configureRouter(config: RouterConfiguration, router: Router) {

    config.map([

      {
        route: '', redirect: 'get-started'
      },
      {
        route: 'get-started',
        name: 'get-started',
        moduleId: PLATFORM.moduleName('./routes/get-started'),
        nav: true,
        title: 'Get Started',
        settings: { auth: false, navigation: [] }
      },
      {
        route: ['bootstrap'],
        name: 'bootstrap',
        moduleId: PLATFORM.moduleName('./routes/bootstrap-route'),
        nav: true,
        title: 'Bootstrap',
        settings: {
          auth: false, navigation: [
            {
              route: 'alert',
              title: 'Alert'
            },
            {
              route: 'badge',
              title: 'Badge'
            },
            {
              route: 'breadcrumb',
              title: 'Breadcrumb'
            },
            {
              route: 'buttons',
              title: 'Buttons'
            },
            {
              route: 'button-groups',
              title: 'Button Groups'
            },
            {
              route: 'card',
              title: 'Card'
            }
            ,
            {
              route: 'carousel',
              title: 'Carousel'
            }, {
              route: 'collapse',
              title: 'Collapse'
            }
            , {
              route: 'dropdown',
              title: 'Dropdowns'
            },
            {
              route: 'float-input',
              title: 'Float Input'
            },
            {
              route: 'input-group',
              title: 'Input Group'

            },
            {
              route: 'jumbotron', title: 'Jumbotron'
            },
            {
              route: 'list-group', title: 'List Group'
            },
            {
              route: 'modal', title: 'Modals'

            },
            {
              route: 'navbar', title: 'Navbar'

            },
            {
              route: 'navs', title: 'Navs'
            },
            {
              route: 'password', title: 'Password'
            },
            {
              route: 'progress', title: 'Progressbar'
            },
            {
              route: 'star-rate', title: 'Star Rate'
            },
            {
              route: 'scrollspy', title: 'Scrollspy'
            },
            {
              route: 'toggle', title: 'Toggle'
            },
            {
              route: 'tokenize', title: 'Tokenize'
            },
            {
              route: 'tooltip', title: 'Tooltip'
            },
            {
              route: 'popover', title: 'Popover'
            }
            ,
            {
              route: 'pagination', title: 'Pagination'
            }
          ]
        }
      },
      {
        route: ['vanilla'],
        name: 'vanilla',
        moduleId: PLATFORM.moduleName('./routes/vanilla-route'),
        nav: true,
        title: 'JS',
        settings: {
          auth: false, navigation: [
            // {
            //   route: 'checkbox', title: 'Pretty Checkbox'
            // },
            // {
            //   route: 'radio', title: 'Pretty Radio'
            // },
            // {
            //   route: 'markdown', title: 'Mark Down'
            // },
            // {
            //   route: 'masked-input', title: 'Masked Input'
            // },
            {
              route: 'scrollup', title: 'ScrollUp'
            },
            {
              route: 'divider', title: 'Divider'
            }
          /*,{
            route: 'microlink', title: 'Microlink'
          }*/]
        }
      },
      {
        route: ['jquery'],
        name: 'jquery',
        moduleId: PLATFORM.moduleName('./routes/jquery-route'),
        nav: true,
        title: 'jQuery',
        settings: {
          auth: false, navigation: [{
            route: 'blockui', title: 'Block UI'
          }
            /*,{
              route: 'lazyimage', title: 'Lazy Image'
            }*/
          ]
        }
      }
    ]);

    // config.options.pushState = true;
    // config.mapUnknownRoutes('./routes/not-found.html');

    this.router = router;
  }

  private selectedThemeChanged(newValue: Theme) {
    localStorage.setItem('selectedTheme', JSON.stringify(newValue));

    this.bsService.update();

    /* toastr flat theme */
    DOM.injectStyles(`
    .toast {
      background-color: ${this.bsService.primary} !important;
    }
    .toast-success {
      background-color: ${this.bsService.success} !important;
    }
    .toast-error {
      background-color: ${this.bsService.danger} !important;
    }
    .toast-info {
      background-color: ${this.bsService.info} !important;
    }
    .toast-warning {
      background-color: ${this.bsService.warning} !important;
    }
    #toast-container > div {
      -moz-border-radius: 0px !important;
      -webkit-border-radius: 0px !important;
      border-radius: 0px !important;
    }
    `);
    /*************************************************************************** */

  }

}
