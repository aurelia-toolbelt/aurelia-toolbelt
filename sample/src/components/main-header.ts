import { bindable, bindingMode } from 'aurelia-framework';
import { Router } from 'aurelia-router';



class Theme {
    public name: string;
    public path: string;
}


export class MainHeader {

    @bindable({ defaultBindingMode: bindingMode.twoWay }) private  router: Router;

    @bindable({ defaultBindingMode: bindingMode.twoWay }) private  themes: Array<Theme>;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) private theme: Theme;
}
