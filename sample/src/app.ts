import { Router, RouterConfiguration } from 'aurelia-router';
import { PLATFORM, bindable } from 'aurelia-framework';

class Theme {
  public name: string;
  public path: string;
}

export class App {

  public router: Router;

  private themes: Array<Theme>;
  @bindable() private selectedTheme: Theme;

  constructor(Logger) {

    this.themes = [
      { name: 'default', path: '/bootswatch/default' },
      { name: 'cosmo', path: '/bootswatch/cosmo' },
      { name: 'superhero', path: '/bootswatch/superhero' },
      { name: 'flatly', path: '/bootswatch/flatly' },
      { name: 'yeti', path: '/bootswatch/yeti' },
      { name: 'cyborg', path: '/bootswatch/cyborg' }
    ];
  }



  public configureRouter(config: RouterConfiguration, router: Router) {

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
    sessionStorage.setItem('selectedTheme', JSON.stringify(newValue));
  }

}
