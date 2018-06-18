import { Router, RouterConfiguration } from 'aurelia-router';
import { PLATFORM, bindable, EventManager, inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { DOM } from 'aurelia-pal';


class Theme {
  public name: string;
  public path: string;
}

@inject()
export class App {

  public router: Router;
  private rate = 3;


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
              route: 'progress', title: 'Progressbar'
            },
            {
              route: 'scrollspy', title: 'Scrollspy'
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
      }
    ]);

    // config.options.pushState = true;
    // config.mapUnknownRoutes('./routes/not-found.html');

    this.router = router;
  }

}
