import { Router, RouterConfiguration } from 'aurelia-router';
import { PLATFORM, bindable, EventManager, inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { DOM } from 'aurelia-pal';

class Theme {
  public name: string;
  public path: string;
}

@inject(EventAggregator)
export class App {

  public router: Router;

  private themes: Array<Theme>;
  @bindable() private selectedTheme: Theme;

  constructor(eventAggregator: EventAggregator) {

    this.themes = [
      { name: 'aurelia-toolbelt', path: '/bootswatch/aurelia-toolbelt' },
      { name: 'bootstrap', path: '/bootswatch/bootstrap' },
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


    // eventAggregator.subscribe('router:navigation:complete', () => {
    //   if (!window.location.hash) {
    //     return;
    //   }
    //   const doc = DOM.getElementById(window.location.hash.substr(1));
    //   if (doc) {
    //     doc.scrollIntoView();
    //   }
    // });

  }



  public configureRouter(config: RouterConfiguration, router: Router) {


    // config.options.pushState = true;

    config.map([
      {
        route: ['bootstrap'],
        name: 'bootstrap',
        moduleId: PLATFORM.moduleName('./routes/bootstrap-route'),
        nav: true,
        title: 'Bootstrap',
        settings: { auth: false }
      },
      {
        route: ['purejs'],
        name: 'purejs',
        moduleId: PLATFORM.moduleName('./routes/purejs-route'),
        nav: true,
        title: 'JS',
        settings: { auth: false }
      },
      {
        route: ['jquery'],
        name: 'jquery',
        moduleId: PLATFORM.moduleName('./routes/jquery-route'),
        nav: true,
        title: 'jQuery',
        settings: { auth: false }
      }
    ]);
    this.router = router;
  }

  private selectedThemeChanged(newValue: Theme) {
    localStorage.setItem('selectedTheme', JSON.stringify(newValue));
  }

}
