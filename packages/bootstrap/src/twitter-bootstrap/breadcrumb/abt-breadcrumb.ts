import { customElement, containerless, inject, bindable, bindingMode } from 'aurelia-framework';
import { IBreadcrumbItem } from './breadcrumb-item';



@containerless()
@customElement('abt-breadcrumb')
export class BootstrapBreadcrumb {

  @bindable({ defaultBindingMode: bindingMode.oneWay }) public items: Array<IBreadcrumbItem>;

}
