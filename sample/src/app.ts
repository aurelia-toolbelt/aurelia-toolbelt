import { Router, RouterConfiguration } from 'aurelia-router';


export class App {
  public router: Router;
  public configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Plugin Sample';
    config.map([
      {
        route: ['', 'page1'],
        name: 'page1',
        moduleId: './routes/page1',
        nav: true,
        title: 'page1',
        settings: { auth: false }
      },
      {
        route: 'page2',
        name: 'page2',
        moduleId: './routes/page2',
        nav: true,
        title: 'page2',
        settings: { auth: false }
      },
      {
        route: 'page3',
        name: 'page3',
        moduleId: './routes/page3',
        nav: true,
        title: 'page3',
        settings: { auth: false }
      },
      {
        route: 'checkbox',
        name: 'checkbox',
        moduleId: './routes/checkbox',
        nav: true,
        title: 'Pretty Checkbox',
        settings: { auth: false }
      },
      {
        route: 'radio',
        name: 'radio',
        moduleId: './routes/radio',
        nav: true,
        title: 'Pretty Radio Buttons',
        settings: { auth: false }
      }
    ]);
    this.router = router;
  }
}
