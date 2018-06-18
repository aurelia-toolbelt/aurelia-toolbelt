import { containerless, customElement } from 'aurelia-framework';
import { bindingMode } from 'aurelia-binding';
import { bindable } from 'aurelia-templating';


@containerless()
@customElement('abt-alert-heading')
export class BootstrapAlertHeading {
  @bindable({ defaultBindingMode: bindingMode.oneTime }) public id: string = '';
}
