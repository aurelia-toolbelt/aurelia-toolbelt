import { bindable, bindingMode } from 'aurelia-framework';
import { Router } from 'aurelia-router';



class Theme {
  public name: string;
  public path: string;
}


export class MainHeader {

  @bindable({ defaultBindingMode: bindingMode.twoWay }) private router: Router;

  @bindable({ defaultBindingMode: bindingMode.twoWay }) private themes: Array<Theme>;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) private theme: Theme;


  private bind() {
    let storedTheme = <Theme>JSON.parse(localStorage.getItem('selectedTheme'));
    if (!storedTheme) {
      this.theme = this.themes[0];
      return;
    }
    let index = this.themes.findIndex(x => x.path === storedTheme.path);
    if (index === -1) {
      this.theme = this.themes[0];
      return;
    }
    this.theme = this.themes[index];

  }
}
