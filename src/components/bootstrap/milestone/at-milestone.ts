import { customElement, containerless, bindable, bindingMode } from 'aurelia-framework';


@containerless()
@customElement('at-milestone')
export class AureliaToolbeltMilestone {


  @bindable({ defaultBindingMode: bindingMode.oneTime }) public type: string = 'secondary';
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public icon: string = '';

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public style: string = '';
  @bindable({ defaultBindingMode: bindingMode.oneWay }) public class: string = '';

}
